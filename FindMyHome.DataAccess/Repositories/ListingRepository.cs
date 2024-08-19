using System.Linq.Expressions;
using FindMyHome.Common.Enums;
using FindMyHome.Domain.Entities;
using FindMyHome.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace FindMyHome.DataAccess.Repositories;

public class ListingRepository : IListingRepository
{
    private readonly FindMyHomeContext _context;

    public ListingRepository(FindMyHomeContext context)
    {
        _context = context;
    }

    public void Add(Listing listing)
    {
        _context.Listings.Add(listing);
    }

    public void AddRange(IEnumerable<Listing> listings)
    {
        _context.Listings.AddRange(listings);
    }

    public IEnumerable<Listing> Find(Expression<Func<Listing, bool>> predicate)
    {
        return _context.Listings.Where(predicate);
    }

    public IEnumerable<Listing> GetAll()
    {
        return _context.Listings.ToList();
    }

    public Listing Get(int listingId)
    {
        return _context.Listings.Include(c => c.ListingType)
                            .Include(c => c.ListingMarketingType)
                            .Include(c => c.City)
                            .Include(c => c.County)
                            .Include(c => c.ListingPictures)
                            .Include(c => c.CreatedByUser)
                            .FirstOrDefault(c => c.ListingId == listingId);
    }

    public IEnumerable<Listing> GetByUserId(int userId)
    {
        return _context.Listings.Include(c => c.ListingType)
                            .Include(c => c.ListingMarketingType)
                            .Include(c => c.City)
                            .Include(c => c.County)
                            .Include(c => c.ListingPictures)
                            .Where(c => c.CreatedByUserId == userId);
    }

    public IEnumerable<Listing> GetList(string search,
                                    IEnumerable<int> listingTypeIds,
                                    IEnumerable<int> listingMarketingTypeIds,
                                    IEnumerable<int> countyIds,
                                    IEnumerable<int> cityIds,
                                    int? sortById)
    {
        IQueryable<Listing> listings = _context.Listings.Include(c => c.ListingType)
                                             .Include(c => c.ListingMarketingType)
                                             .Include(c => c.County)
                                             .Include(c => c.City)
                                             .Include(c => c.ListingPictures);

        if (!string.IsNullOrEmpty(search))
        {
            listings = listings.Where(c => c.Title.Contains(search) || c.Description.Contains(search));
        }

        if (!listingTypeIds.IsNullOrEmpty())
        {
            listings = listings.Where(c => listingTypeIds.Contains(c.ListingTypeId));
        }

        if (!listingMarketingTypeIds.IsNullOrEmpty())
        {
            listings = listings.Where(c => listingMarketingTypeIds.Contains(c.ListingMarketingTypeId));
        }

        if (!countyIds.IsNullOrEmpty())
        {
            listings = listings.Where(c => countyIds.Contains(c.CountyId));
        }

        if (!cityIds.IsNullOrEmpty())
        {
            listings = listings.Where(c => cityIds.Contains(c.CityId));
        }

        if (sortById != null)
        {
            switch (sortById)
            {
                case (int)SortType.Title:
                    listings = listings.OrderBy(c => c.Title);
                    break;

                case (int)SortType.Price:
                    listings = listings.OrderBy(c => c.Price);
                    break;

                case (int)SortType.CreationDate:
                    listings = listings.OrderBy(c => c.CreatedOn);
                    break;
            }
        }

        return listings;
    }

    public void Remove(Listing listing)
    {
        _context.Listings.Remove(listing);
    }

    public void RemoveRange(IEnumerable<Listing> listings)
    {
        _context.Listings.RemoveRange(listings);
    }

    public Listing SingleOrDefault(Expression<Func<Listing, bool>> predicate)
    {
        return _context.Listings.SingleOrDefault(predicate);
    }
}
