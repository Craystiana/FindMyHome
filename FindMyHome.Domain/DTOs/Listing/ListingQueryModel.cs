namespace FindMyHome.Domain.DTOs.Listing;

public class ListingQueryModel
{
    public IEnumerable<int> ListingTypeIds { get; set; }

    public IEnumerable<int> ListingMarketingTypeIds { get; set; }

    public IEnumerable<int> CityIds { get; set; }
    public IEnumerable<int> CountyIds { get; set; }

    public int? SortById { get; set; }

    public string SearchTerm { get; set; }
}
