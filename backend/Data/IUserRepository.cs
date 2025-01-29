using backend.Models;

namespace backend.Data
{
    public interface IUserRepository
    {
        User Create(User user);
        User GetByEmail(string email);
        User GetById(int id);
        User GetByResetToken(string token);
        User Update(User user);
    }
}
