using FindMyHome.Domain.DTOs.Generic;
using FindMyHome.Domain.DTOs.Listing;
using FindMyHome.Domain.Entities;
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
            ListingMarketingType = listing.ListingMarketingType.Name,
            County = listing.County.Name,
            City = listing.City.Name,
            IsClosed = listing.IsClosed,
            Price = listing.Price,
            Latitude = listing.Latitude,
            Longitude = listing.Longitude,
            Picture = listing.Picture != null ? ConvertToBase64String(listing.Picture) : null
        };
    }

    public ListingDataModel GetCarData()
    {
        return new ListingDataModel
        {
            Counties = UnitOfWork.CountyRepository.GetAll().Select(ct => new GenericModel { Id = ct.CountyId, Name = ct.Name }),
            Cities = UnitOfWork.CityRepository.GetAll().Select(ct => new GenericModel { Id = ct.CityId, Name = ct.Name }),
            ListingTypes = UnitOfWork.ListingTypeRepository.GetAll().Select(ct => new GenericModel { Id = ct.ListingTypeId, Name = ct.Name }),
            ListingMarketingTypes = UnitOfWork.ListingMarketingTypeRepository.GetAll().Select(ct => new GenericModel { Id = ct.ListingMarketingTypeId, Name = ct.Name }),
        };
    }

    public void Add(ListingEditModel model)
    {
        var listing = new Listing
        {
            Title = model.Title,
            Description = model.Description,
            Location = model.Location,
            ListingTypeId = model.ListingTypeId,
            ListingMarketingTypeId = model.ListingMarketingTypeId,
            CityId = model.CityId,
            CountyId = model.CountyId,
            Price = model.Price,
            Latitude = model.Latitude,
            Longitude = model.Longitude,
            Picture = model.Picture != null ? ConvertToByteArray(model.Picture) : null,
            CreatedByUserId = model.UserId
        };

        UnitOfWork.ListingRepository.Add(listing);
        UnitOfWork.SaveChanges();
    }

    public void Edit(ListingEditModel model)
    {
        var listing = UnitOfWork.ListingRepository.Get((int)model.ListingId);

        listing.Title = model.Title;
        listing.Description = model.Description;
        listing.Location = model.Location;
        listing.ListingTypeId = model.ListingTypeId;
        listing.ListingMarketingTypeId = model.ListingMarketingTypeId;
        listing.CityId = model.CityId;
        listing.CountyId = model.CountyId;
        listing.Price = model.Price;
        listing.Latitude = model.Latitude;
        listing.Longitude = model.Longitude;

        if (model.Picture != null)
        {
            listing.Picture = ConvertToByteArray(model.Picture);
        }

        UnitOfWork.SaveChanges();
    }

    public void Delete(int listingId)
    {
        UnitOfWork.ListingRepository.Remove(UnitOfWork.ListingRepository.Get(listingId));
        UnitOfWork.SaveChanges();
    }

    public IEnumerable<ListingModel> GetList(ListingQueryModel model)
    {
        return UnitOfWork.ListingRepository.GetList(model.SearchTerm, model.ListingTypeIds, model.ListingMarketingTypeIds, model.CountyIds, model.CityIds, model.SortById)
            .Select(c => new ListingModel
            {
                ListingId = c.ListingId,
                Title = c.Title,
                Description = c.Description,
                Location = c.Location,
                ListingType = c.ListingType.Name,
                ListingMarketingType = c.ListingMarketingType.Name,
                County = c.County.Name,
                City = c.City.Name,
                IsClosed = c.IsClosed,
                Price = c.Price,
                Latitude = c.Latitude,
                Longitude = c.Longitude,
                Picture = c.Picture != null ? ConvertToBase64String(c.Picture) : null
            });
    }

    public static byte[] ConvertToByteArray(string img)
    {
        return string.IsNullOrEmpty(img) ? null : Convert.FromBase64String(img);
    }

    public static string ConvertToBase64String(byte[] byteArray)
    {
        return byteArray == null ? null : Convert.ToBase64String(byteArray);
    }
}
