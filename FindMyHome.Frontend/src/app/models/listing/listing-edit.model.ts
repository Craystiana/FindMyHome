export class ListingEdit{
    public listingId : number;
    public type : number;
    public countyId : number;
    public cityId : number;
    public title : string;
    public description : string;
    public price : number;
    public picture : string | undefined;
    public latitude: number = 44.439663;
    public longitude: number = 26.096306;

    public constructor(carId: number,
                       carType: number, 
                       countyId: number, 
                       cityId : number, 
                       title : string, 
                       description : string,
                       price : number, 
                       photo : string | undefined,
                       latitude: number,
                       longitude: number) {
        this.listingId = carId;                   
        this.type = carType;
        this.countyId = countyId;
        this.cityId = cityId;
        this.title = title;
        this.description = description;
        this.price = price;
        this.picture = photo;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}