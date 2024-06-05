export interface ListingModel {
    listingId: number;
    title: string;
    description: string;
    location: string;
    listingType: string;
    county: string;
    city: string;
    price: number;
    picture: Blob;
}