using FindMyHome.Domain.Entities;
using FindMyHome.Domain.Interfaces.Repositories;

namespace FindMyHome.DataAccess.Repositories;

public class UserRepository : Repository<User>, IUserRepository
{
    /// <summary>
    /// UserRepository constructor
    /// </summary>
    /// <param name="context"></param>
    public UserRepository(FindMyHomeContext context) : base(context) { }

    /// <summary>
    /// Retrieve the user by the email
    /// </summary>
    /// <param name="email"></param>
    /// <returns></returns>
    public User Get(string email)
    {
        return _context.Users.FirstOrDefault(u => u.Email == email);
    }

    /// <summary>
    /// Retrieve the user details by the user id
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    public User GetDetails(int userId)
    {
        return _context.Users.SingleOrDefault(u => u.UserId == userId);

    }
}
