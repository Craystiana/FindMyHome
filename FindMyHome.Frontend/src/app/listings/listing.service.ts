import { HttpClient } from "@angular/common/http";
import { Observable, map, of } from "rxjs";
import { Injectable } from "@angular/core";
import { ListingModel } from "../models/listing/listing.model";
import { API_URL, LOGIN_URL } from "src/environments/environment";
import { ListingEdit } from "../models/listing/listing-edit.model";
import { ListingData } from "../models/listing/listing-data.model";
import { ListingQuery } from "../models/listing/listing-query.model";

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  listings: ListingModel[] = [{listingId: 1, listingType: "casa", listingMarketingType: 'vanzare', description: "Casa de 300mp cu teren de 500mp", title: "Casa de vanzare", location: "Str. Vantului, Nr. 2", county: "Dolj", city: "Craiova", price: 1934329, picture: 'https://images.adsttc.com/media/images/63a0/5173/a452/0802/91ad/5440/slideshow/cuas-house-3fconcept_6.jpg?1671451021', latitude: 44.439663, longitude: 26.096306},
  {listingId: 2, listingType: "apartment", listingMarketingType: 'vanzare', description: "Apartament de doua camere, 60mp", title: "Apartament de vanzare", location: "Str. Agriculturii, Nr. 3", county: "Dolj", city: "Craiova", price: 232844638, picture: 'https://www.apartments.com/blog/sites/default/files/styles/x_large/public/image/2023-06/ParkLine-apartment-in-Miami-FL.jpg.webp?itok=lYDRCGzC', latitude: 44.439663, longitude: 26.096306},
  {listingId: 3, listingType: "teren", listingMarketingType: 'vanzare', description: "Teren de 600mp cu deschidere de 20mp", title: "Teren de vanzare", location: "Str. Nufarului, Nr. 4", county: "Dolj", city: "Craiova", price: 32432523, picture: 'https://imobiliaregreen.ro/wp-content/uploads/2017/08/146759169_1_644x461_ocazie-teren-intravilan-in-chinteni-pentru-constructie-de-case-cluj-napoca_rev002-614x323-1.jpg', latitude: 44.439663, longitude: 26.096306}
  ];
  
  constructor(private http: HttpClient) {
  }

  getListings(model: ListingQuery): Observable<ListingModel[]> {
    // return this.http.get<ListingModel[]>(API_URL + LOGIN_URL).pipe(
    //   map((listings: ListingModel[]) => {
    //     return listings;
    //   })
    // );
    return of<ListingModel[]>(this.listings);
  }

  getFavouriteListings(): Observable<ListingModel[]>{
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

  getListingData(): Observable<ListingData> {
    var listingData = new ListingData();
    listingData.listingCities = [{id: 1, name: 'Craiova'}, {id: 2, name: 'Bucuresti'}];
    listingData.listingCounties = [{id: 1, name: 'Dolj'}, {id: 2, name: 'Ilfov'}];
    listingData.listingTypes = [{id: 1, name: 'Apartament'}, {id: 2, name: 'Teren'}, {id: 3, name: 'Casa'}];
    listingData.listingMarketingTypes = [{id: 1, name: 'De vanzare'}, {id: 2, name: 'De inchiriere'}];
    return of(listingData)
  }
}