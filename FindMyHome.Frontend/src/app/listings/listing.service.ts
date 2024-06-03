import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { ListingModel } from "../models/listing/listing.model";

@Injectable({
  providedIn: 'root'
})
export class ListingService {
    listings: ListingModel[] = [{listingId: 1, listingType: "apartment", description: "description", title: "apartament de vanzare", location: "location", countyId: 1, cityId: 1}];
  constructor(private http: HttpClient) {
  }

  getListings(): Observable<ListingModel[]> {
    // return this.http.get<ListingModel[]>(API_URL + LOGIN_URL).pipe(
    //   map((listings: ListingModel[]) => {
    //     return listings;
    //   })
    // );
    return of<ListingModel[]>(this.listings);
  }
}