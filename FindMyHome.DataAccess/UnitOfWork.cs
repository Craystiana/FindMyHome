using FindMyHome.DataAccess.Repositories;
using FindMyHome.Domain.Entities;
using FindMyHome.Domain.Interfaces;
using FindMyHome.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace FindMyHome.DataAccess;

public class UnitOfWork : IUnitOfWork
{
    private readonly FindMyHomeContext _context;

    private bool isDisposed;

    private IUserRepository _userRepository;
    private IRepository<UserRole> _userRoleRepository;
    private IRepository<County> _countyRepository;
    private IRepository<City> _cityRepository;
    private IRepository<ListingType> _listingTypeRepository;
    private IRepository<Listing> _listingRepository;

    public UnitOfWork(string connectionString)
    {
        var optionsBuilder = new DbContextOptionsBuilder<FindMyHomeContext>();
        optionsBuilder.UseSqlServer(connectionString);

        _context = new FindMyHomeContext(optionsBuilder.Options);
    }

    public IUserRepository UserRepository => _userRepository ??= new UserRepository(_context);
    public IRepository<County> CountyRepository => _countyRepository ??= new Repository<County>(_context);
    public IRepository<City> CityRepository => _cityRepository ??= new Repository<City>(_context);
    public IRepository<ListingType> ListingTypeRepository => _listingTypeRepository ??= new Repository<ListingType>(_context);
    public IRepository<Listing> ListingRepository => _listingRepository ??= new Repository<Listing>(_context);
    public IRepository<UserRole> UserRoleRepository => _userRoleRepository ??= new Repository<UserRole>(_context);

    protected virtual void Dispose(bool disposing)
    {
        if (!isDisposed)
        {
            if (disposing)
            {
                _context.Dispose();
            }

            isDisposed = true;
        }
    }

    public void Dispose()
    {
        Dispose(disposing: true);
        GC.SuppressFinalize(this);
    }

    public int SaveChanges()
    {
        return _context.SaveChanges();
    }
}
