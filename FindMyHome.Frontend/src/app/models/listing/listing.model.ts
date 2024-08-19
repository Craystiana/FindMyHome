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
    pictures: string[] | null;
    latitude: number;
    longitude: number;
    isFavorite: boolean;
    canEdit: boolean;
    sellerFirstName: string;
    sellerLastName: string;
    sellerPhoneNumber: string;
    sellerEmail: string;
}