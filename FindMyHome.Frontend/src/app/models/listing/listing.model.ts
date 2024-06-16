export interface ListingModel {
    listingId: number;
    title: string;
    description: string;
    location: string;
    listingType: string;
    listingMarketingType: string;
    county: string;
    city: string;
    price: number;
    picture: Blob | string | null;
    latitude: number;
    longitude: number;
}