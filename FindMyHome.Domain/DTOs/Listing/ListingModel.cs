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
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }
    public bool IsClosed { get; set; }
    public List<string> Pictures { get; set; }
    public bool IsFavorite { get; set; } = false;
    public DateTime CreatedOn { get; set; }
    public bool CanEdit { get; set; } = false;
    public string? SellerFirstName {  get; set; }
    public string? SellerLastName { get; set; }
    public string? SellerPhoneNumber { get; set; }
    public string? SellerEmail { get; set; }
}
