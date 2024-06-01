using System.ComponentModel.DataAnnotations;

namespace FindMyHome.Domain.Entities;

public class ListingType
{
    [Key]
    public int ListingTypeId {  get; set; }
    [Required]
    public string Name { get; set; }
    public virtual ICollection<Listing> Listings { get; set; }
}
