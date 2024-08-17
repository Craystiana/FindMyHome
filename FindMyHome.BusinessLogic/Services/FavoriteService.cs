using FindMyHome.Domain.DTOs.Listing;
using FindMyHome.Domain.Entities;
using FindMyHome.Domain.Interfaces;

namespace FindMyHome.BusinessLogic.Services;

public class FavoriteService : BaseService
{
    public FavoriteService(IUnitOfWork unitOfWork) : base(unitOfWork) { }

    public void Add(int userId, int listingId)
    {
        var favorite = new UserListingFavorite
        {
            UserId = userId,
            ListingId = listingId
        };

        UnitOfWork.UserListingFavoriteRepository.Add(favorite);
        UnitOfWork.SaveChanges();
    }

    public void Delete(int userId, int listingId)
    {
        var favorite = UnitOfWork.UserListingFavoriteRepository.Find(f => f.UserId == userId && f.ListingId == listingId).FirstOrDefault();
        if (favorite != null)
        {
            UnitOfWork.UserListingFavoriteRepository.Remove(favorite);
            UnitOfWork.SaveChanges();
        }
    }

    public IEnumerable<ListingModel> GetList(int userId)
    {
        return UnitOfWork.UserListingFavoriteRepository.GetList(userId)
            .Select(c => new ListingModel
            {
                ListingId = c.ListingId,
                Title = c.Listing.Title,
                Description = c.Listing.Description,
                Location = c.Listing.Location,
                ListingType = c.Listing.ListingType.Name,
                ListingMarketingType = c.Listing.ListingMarketingType.Name,
                County = c.Listing.County.Name,
                City = c.Listing.City.Name,
                IsClosed = c.Listing.IsClosed,
                Price = c.Listing.Price,
                Latitude = c.Listing.Latitude,
                Longitude = c.Listing.Longitude,
                Pictures = c.Listing.ListingPictures.Select(p => ConvertToBase64String(p.Picture)).ToList(),
            });
    }

    public static string ConvertToBase64String(byte[] byteArray)
    {
        return byteArray == null ? null : Convert.ToBase64String(byteArray);
    }
}
