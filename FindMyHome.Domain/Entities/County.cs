using System.ComponentModel.DataAnnotations;

namespace FindMyHome.Domain.Entities;

public class County
{
    [Key]
    public int CountyId { get; set; }
    [Required]
    public string Name { get; set; }
    
    public virtual ICollection<Listing> Listings { get; set; }
}
