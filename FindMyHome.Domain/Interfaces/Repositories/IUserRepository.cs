using FindMyHome.Domain.Entities;

namespace FindMyHome.Domain.Interfaces.Repositories;

public interface IUserRepository : IRepository<User>
{
    public User Get(string email);
    public User GetDetails(int userId);
}
