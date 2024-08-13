using FindMyHome.Domain.DTOs.Generic;

namespace FindMyHome.Domain.DTOs.Listing;

public class ListingDataModel
{
    public IEnumerable<GenericModel> Counties { get; set; }
    public IEnumerable<GenericModel> Cities { get; set; }
    public IEnumerable<GenericModel> ListingTypes { get; set; }
    public IEnumerable<GenericModel> ListingMarketingTypes { get; set; }
}
