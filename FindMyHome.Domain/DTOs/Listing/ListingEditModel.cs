namespace FindMyHome.Domain.DTOs.Listing;

public class ListingEditModel
{
    public int ListingId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Location { get; set; }
    public int ListingTypeId { get; set; }
    public int ListingMarketingTypeId { get; set; }
    public int CountyId { get; set; }
    public int CityId { get; set; }
    public long Price { get; set; }
    public long? Latitude { get; set; }
    public long? Longitude { get; set; }
    public bool IsClosed { get; set; }
    public string? Picture { get; set; }
    public int UserId { get; set; }
}
