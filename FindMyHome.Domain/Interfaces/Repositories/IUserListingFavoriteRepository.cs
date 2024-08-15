using FindMyHome.Domain.Entities;

namespace FindMyHome.Domain.Interfaces.Repositories;

public interface IUserListingFavoriteRepository : IRepository<UserListingFavorite>
{
    public IEnumerable<UserListingFavorite> GetList(int userId);
}
