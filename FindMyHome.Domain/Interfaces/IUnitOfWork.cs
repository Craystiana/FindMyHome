using FindMyHome.Domain.Entities;
using FindMyHome.Domain.Interfaces.Repositories;

namespace FindMyHome.Domain.Interfaces;

public interface IUnitOfWork : IDisposable
{
    IUserRepository UserRepository { get; }
    IRepository<UserRole> UserRoleRepository { get; }
    IRepository<County> CountyRepository { get; }
    IRepository<City> CityRepository { get; }
    IRepository<ListingType> ListingTypeRepository { get; }
    IRepository<Listing> ListingRepository { get; }


    int SaveChanges();
}
