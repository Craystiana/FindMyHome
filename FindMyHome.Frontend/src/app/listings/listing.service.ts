import { HttpClient } from "@angular/common/http";
import { Observable, map, of } from "rxjs";
import { Injectable } from "@angular/core";
import { ListingModel } from "../models/listing/listing.model";
import { API_URL, LOGIN_URL } from "src/environments/environment";
import { ListingEdit } from "../models/listing/listing-edit.model";

@Injectable({
  providedIn: 'root'
})
export class ListingService {
    listings: ListingModel[] = [{listingId: 1, listingType: "apartment", description: "description", title: "apartament de vanzare", location: "location", county: "Dolj", city: "Craiova", price: 1934329, picture: new Blob()}];
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

  getListing(id: number): Observable<ListingModel> {
    // return this.http.get<ListingModel>(API_URL + LOGIN_URL).pipe(
    //   map((data: ListingModel) => {
    //     return data;
    //   })
    // )

    return of<ListingModel>(this.listings[0]);
  }

  delete(id: number): Observable<boolean> {
    // return this.http.delete<boolean>(API_URL + LOGIN_URL).pipe(
    //   map((data: boolean) => {
    //     return data;
    //   })
    // )
    return of(true);
  }

  edit(model: ListingEdit): Observable<boolean> {
    // return this.http.post<boolean>(API_URL + LOGIN_URL, model).pipe(
    //   map((data: boolean) => {
    //     return data;
    //   })
    // )

    return of(true);
  }
}