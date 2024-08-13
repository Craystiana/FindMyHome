using System.ComponentModel.DataAnnotations;

namespace FindMyHome.Domain.Entities;

public class ListingMarketingType
{
    [Key]
    public int ListingMarketingTypeId { get; set; }
    [Required]
    public string Name { get; set; }
    public virtual ICollection<Listing> Listings { get; set; }
}
