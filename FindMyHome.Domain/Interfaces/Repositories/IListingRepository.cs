using System.Linq.Expressions;
using FindMyHome.Domain.Entities;

namespace FindMyHome.Domain.Interfaces.Repositories;

public interface IListingRepository : IRepository<Listing>
{
    Listing Get(int id);

    IEnumerable<Listing> GetAll();

    IEnumerable<Listing> Find(Expression<Func<Listing, bool>> predicate);

    Listing SingleOrDefault(Expression<Func<Listing, bool>> predicate);


    void Add(Listing listing);

    void AddRange(IEnumerable<Listing> listings);

    void Remove(Listing listing);

    void RemoveRange(IEnumerable<Listing> listings);

    IEnumerable<Listing> GetList(string search, IEnumerable<int> listingTypeIds, IEnumerable<int> listingMarketingTypeIds, IEnumerable<int> countyIds, IEnumerable<int> cityIds, int? sortById);
}
