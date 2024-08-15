using System.ComponentModel.DataAnnotations;

namespace FindMyHome.Domain.Entities;

public class UserListingFavorite
{
    [Key]
    public int FavoriteId { get; set; }
    [Required]
    public int UserId { get; set; }
    [Required]
    public int ListingId { get; set; }

    public virtual User User { get; set; }
    public virtual Listing Listing { get; set; }
}
