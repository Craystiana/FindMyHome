export class ListingQuery {
    public listingTypeIds: number[];
    public listingCountyIds: number[];
    public listingCityIds: number[];
    public listingMarketingTypeIds: number[];
    public sortById: number;
    public searchTerm: string;

    public constructor(listingTypeIds: number[], listingCountyIds: number[], listingCityIds: number[], listingMarketingTypeIds: number[], sortById: number, searchTerm: string){
        this.listingCityIds = listingCityIds;
        this.listingCountyIds = listingCountyIds;
        this.listingTypeIds = listingTypeIds;
        this.listingMarketingTypeIds = listingMarketingTypeIds;
        this.searchTerm = searchTerm;
        this.sortById = sortById;
    }
}