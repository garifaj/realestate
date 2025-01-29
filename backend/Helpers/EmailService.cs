using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;

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
                <p>Click this link to reset your password:</p>
                <a href='http://localhost:5173/reset-password/{System.Web.HttpUtility.UrlEncode(resetToken)}'>
                    Reset Password
                </a>
                <p>This link expires in 1 hour.</p>"
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
    }
}
