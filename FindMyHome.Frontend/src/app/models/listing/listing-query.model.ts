export class ListingQuery {
    public listingTypeIds: number[];
    public listingMarketingTypeIds: number[];
    public cityIds: number[];
    public countyIds: number[];
    public sortById: number;
    public searchTerm: string;

    public constructor(listingTypeIds: number[], listingCountyIds: number[], listingCityIds: number[], listingMarketingTypeIds: number[], sortById: number, searchTerm: string){
        this.listingTypeIds = listingTypeIds;
        this.listingMarketingTypeIds = listingMarketingTypeIds;
        this.cityIds = listingCityIds;
        this.countyIds = listingCountyIds;
        this.searchTerm = searchTerm;
        this.sortById = sortById;
    }
}