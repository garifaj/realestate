using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;
using backend.Models;

namespace backend.Helpers
{
    public class EmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public void SendPasswordResetEmail(string email, string resetToken)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(
                _config["EmailSettings:SenderName"],
                _config["EmailSettings:SenderEmail"]
            ));
            message.To.Add(MailboxAddress.Parse(email));
            message.Subject = "Password Reset Request";

            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = $@"
                <p>Hi,</p>
                <p>Click this link to reset your password:</p>
                <a href='http://localhost:5173/reset-password/{System.Web.HttpUtility.UrlEncode(resetToken)}'>
                    Reset Password
                </a>
                <p>This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.</p>
                <p>Thanks,</p>
                <p>Stated Real Estate Agency"
            };

            message.Body = bodyBuilder.ToMessageBody();

            using var client = new SmtpClient();

            // Determine security options based on port
            var smtpPort = int.Parse(_config["EmailSettings:SmtpPort"]);
            var secureSocketOptions = smtpPort == 465
                ? SecureSocketOptions.SslOnConnect
                : SecureSocketOptions.StartTls;

            // Use SecureSocketOptions instead of the boolean "UseSsl"
            client.Connect(
                _config["EmailSettings:SmtpServer"],
                smtpPort,
                secureSocketOptions // Critical fix here!
            );

            client.Authenticate(
                _config["EmailSettings:SenderEmail"],
                _config["EmailSettings:AppPassword"]
            );

            client.Send(message);
            client.Disconnect(true);
        }

        public void SendBookingConfirmationEmail(string email, Booking booking, Property property)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(
                _config["EmailSettings:SenderName"],
                _config["EmailSettings:SenderEmail"]
            ));
            message.To.Add(MailboxAddress.Parse(email));
            message.Subject = "Booking Confirmation";

            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = $@"
                <p>Hi {booking?.User?.Name ?? "Guest"},</p>
                <p>Exciting news! Your property tour is officially scheduled. Here are the details:</p>
                <ul>
                    <li>🏡 <strong>Property:</strong> {property?.Title ?? "N/A"}</li>
                    <li>📍 <strong>Address:</strong> {property?.Address ?? "Address not provided"}</li>
                    <li>🤝 <strong>Agent:</strong> {property?.Agent?.Name ?? "N/A"} {property?.Agent?.Surname ?? ""}, {property?.Agent?.PhoneNumber ?? "Phone not provided"}</li>
                    <li>📅 <strong>Booking Date:</strong> {booking?.BookingDate.ToString("f") ?? "Date not set"}</li>
                </ul>
                <p>You can view or manage your booking anytime in your account dashboard.</p>
                <p>If you have any questions, feel free to reach out. Looking forward to seeing you!</p>
                <p>Best regards,<br/>Stated Real Estate Agency</p>"
            };


            message.Body = bodyBuilder.ToMessageBody();

            using var client = new SmtpClient();
            var smtpPort = int.Parse(_config["EmailSettings:SmtpPort"]);
            var secureSocketOptions = smtpPort == 465
                ? SecureSocketOptions.SslOnConnect
                : SecureSocketOptions.StartTls;

            client.Connect(
                _config["EmailSettings:SmtpServer"],
                smtpPort,
                secureSocketOptions
            );

            client.Authenticate(
                _config["EmailSettings:SenderEmail"],
                _config["EmailSettings:AppPassword"]
            );

            client.Send(message);
            client.Disconnect(true);
        }
    }
}
