export class ListingEdit{
    public listingId : number;
    public listingTypeId : number;
    public listingMarketingTypeId: number;
    public countyId : number;
    public cityId : number;
    public title : string;
    public description : string;
    public location: string;
    public price : number;
    public pictures : string[] | undefined;
    public latitude: number | undefined;
    public longitude: number | undefined;

    public constructor(carId: number,
                       listingType: number,
                       listingMarketingType: number,
                       countyId: number, 
                       cityId : number, 
                       title : string, 
                       description : string,
                       location: string,
                       price : number, 
                       photo : string[] | undefined,
                       latitude: number | undefined,
                       longitude: number | undefined) {
        this.listingId = carId;                   
        this.listingTypeId = listingType;
        this.listingMarketingTypeId = listingMarketingType;
        this.countyId = countyId;
        this.cityId = cityId;
        this.title = title;
        this.description = description;
        this.location = location;
        this.price = price;
        this.pictures = photo;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}