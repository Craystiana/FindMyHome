using FindMyHome.Domain.Entities;
using FindMyHome.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace FindMyHome.DataAccess.Repositories;

public class UserListingFavoriteRepository : IUserListingFavoriteRepository
{
    private readonly FindMyHomeContext _context;

    public UserListingFavoriteRepository(FindMyHomeContext context)
    {
        _context = context;
    }

    public void Add(UserListingFavorite entity)
    {
        _context.UserListingFavorites.Add(entity);
    }

    public void AddRange(IEnumerable<UserListingFavorite> entities)
    {
        _context.UserListingFavorites.AddRange(entities);
    }

    public IEnumerable<UserListingFavorite> Find(Expression<Func<UserListingFavorite, bool>> predicate)
    {
        return _context.UserListingFavorites.Where(predicate);
    }

    public UserListingFavorite Get(int id)
    {
        return _context.UserListingFavorites.Include(c => c.User)
                            .Include(c => c.Listing)
                            .ThenInclude(c => c.City)
                            .Include(c => c.Listing)
                            .ThenInclude(c => c.County)
                            .Include(c => c.Listing)
                            .ThenInclude(c => c.ListingType)
                            .Include(c => c.Listing)
                            .ThenInclude(c => c.ListingMarketingType)
                            .Include(c => c.Listing)
                            .ThenInclude(c => c.ListingPictures)
                            .FirstOrDefault(c => c.FavoriteId == id);
    }

    public IEnumerable<UserListingFavorite> GetAll()
    {
        return _context.UserListingFavorites.ToList();
    }

    public IEnumerable<UserListingFavorite> GetList(int userId)
    {
        return _context.UserListingFavorites.Include(c => c.User)
                            .Include(c => c.Listing)
                            .ThenInclude(c => c.City)
                            .Include(c => c.Listing)
                            .ThenInclude(c => c.County)
                            .Include(c => c.Listing)
                            .ThenInclude(c => c.ListingType)
                            .Include(c => c.Listing)
                            .ThenInclude(c => c.ListingMarketingType)
                            .Include(c => c.Listing)
                            .ThenInclude(c => c.ListingPictures)
                            .Where(c => c.UserId == userId);
    }

    public void Remove(UserListingFavorite entity)
    {
        _context.UserListingFavorites.Remove(entity);
    }

    public void RemoveRange(IEnumerable<UserListingFavorite> entities)
    {
        _context.UserListingFavorites.RemoveRange(entities);
    }

    public UserListingFavorite SingleOrDefault(Expression<Func<UserListingFavorite, bool>> predicate)
    {
        return _context.UserListingFavorites.SingleOrDefault(predicate);
    }
}
