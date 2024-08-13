namespace FindMyHome.Domain.DTOs.Listing;

public class ListingModel
{
    public int ListingId { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Location { get; set; }
    public string? ListingType { get; set; }
    public string? ListingMarketingType { get; set; }
    public string? County { get; set; }
    public string? City { get; set; }
    public long? Price { get; set; }
    public long? Latitude { get; set; }
    public long? Longitude { get; set; }
    public bool IsClosed { get; set; }
    public string? Picture { get; set; }
    public DateTime CreatedOn { get; set; }
}
