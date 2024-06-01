using System.ComponentModel.DataAnnotations;

namespace FindMyHome.Domain.Entities;

public class City
{
    [Key]
    public int CityId {  get; set; }
    [Required]
    public string Name { get; set; }

    public virtual ICollection<Listing> Listings { get; set; }
}
