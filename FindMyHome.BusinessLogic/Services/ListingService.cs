using FindMyHome.Domain.DTOs.Listing;
using FindMyHome.Domain.Interfaces;

namespace FindMyHome.BusinessLogic.Services;

public class ListingService : BaseService
{
    public ListingService(IUnitOfWork unitOfWork) : base(unitOfWork) { }

    public ListingModel GetListingDetails(int listingId)
    {
        var listing = UnitOfWork.ListingRepository.Get(listingId);

        return new ListingModel
        {
            ListingId = listing.ListingId,
            Title = listing.Title,
            Description = listing.Description,
            Location = listing.Location,
            ListingType = listing.ListingType.Name,
            County = listing.County.Name,
            City = listing.City.Name,
            IsClosed = listing.IsClosed,
        };
    }
}
