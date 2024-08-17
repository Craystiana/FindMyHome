using System.ComponentModel.DataAnnotations;

namespace FindMyHome.Domain.Entities;

public class ListingPicture
{
    [Key]
    public int ListingPhotoId {  get; set; }
    [Required]
    public int ListingId { get; set; }
    [Required]
    public byte[]? Picture { get; set; }

    public virtual Listing Listing {  get; set; }
}
