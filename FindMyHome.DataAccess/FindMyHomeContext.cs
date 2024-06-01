using FindMyHome.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace FindMyHome.DataAccess;

public class FindMyHomeContext : DbContext
{
    public FindMyHomeContext(DbContextOptions<FindMyHomeContext> options) : base(options) { }

    public virtual DbSet<User> Users {  get; set; }
    public virtual DbSet<County> Counties { get; set; }
    public virtual DbSet<City> Cities { get; set; }
    public virtual DbSet<ListingType> ListingTypes {  get; set; }
    public virtual DbSet<Listing> Listings { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Listing>()
            .HasOne(l => l.SoldToUser)
            .WithMany()
            .HasForeignKey(l => l.SoldToUserId)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<Listing>()
            .HasOne(l => l.CreatedByUser)
            .WithMany()
            .HasForeignKey(l => l.CreatedByUserId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}
