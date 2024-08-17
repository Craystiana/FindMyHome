using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace FindMyHome.Domain.Entities;

public class Listing
{
    [Key]
    public int ListingId { get; set; }
    [Required]
    public string Title {  get; set; }
    [Required]
    public string Description { get; set; }
    [Required]
    public string Location { get; set; }
    [Required]
    public int ListingTypeId {  get; set; }
    [Required]
    public int ListingMarketingTypeId { get; set; }
    [Required]
    public int CountyId { get; set; }
    [Required]
    public int CityId { get; set; }
    [Required]
    public long Price { get; set; }
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }
    [Required]
    public int CreatedByUserId {  get; set; }
    public int? SoldToUserId { get; set; }
    [DefaultValue(false)]
    public bool IsClosed {  get; set; }
    public DateTime? CreatedOn {  get; set; }
    public DateTime? UpdatedOn { get; set;}

    public virtual User CreatedByUser { get; set; }
    public virtual User? SoldToUser {  get; set; }
    public virtual ListingType ListingType { get; set; }
    public virtual ListingMarketingType ListingMarketingType { get; set; }
    public virtual County County { get; set; }
    public virtual City City { get; set; }
    public virtual ICollection<ListingPicture> ListingPictures { get; set; }

}
