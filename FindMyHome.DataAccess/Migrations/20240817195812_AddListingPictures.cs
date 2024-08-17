using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FindMyHome.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddListingPictures : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Picture",
                table: "Listings");

            migrationBuilder.CreateTable(
                name: "ListingPictures",
                columns: table => new
                {
                    ListingPhotoId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ListingId = table.Column<int>(type: "int", nullable: false),
                    Picture = table.Column<byte[]>(type: "varbinary(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ListingPictures", x => x.ListingPhotoId);
                    table.ForeignKey(
                        name: "FK_ListingPictures_Listings_ListingId",
                        column: x => x.ListingId,
                        principalTable: "Listings",
                        principalColumn: "ListingId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ListingPictures_ListingId",
                table: "ListingPictures",
                column: "ListingId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ListingPictures");

            migrationBuilder.AddColumn<byte[]>(
                name: "Picture",
                table: "Listings",
                type: "varbinary(max)",
                nullable: true);
        }
    }
}
