import { Component, OnInit } from '@angular/core';
import { ListingService } from '../listing.service';
import { ListingModel } from 'src/app/models/listing/listing.model';
import { first } from 'rxjs';

@Component({
  selector: 'app-listing-overview',
  templateUrl: './listing-overview.component.html',
  styleUrls: ['./listing-overview.component.scss'],
})
export class ListingOverviewComponent {
  public listings: ListingModel[] = [];
  public searchTerm: string = '';

  constructor(private listingService: ListingService) { }

  ionViewWillEnter() {
    this.loadListings();
  }

  loadListings() {
    this.listingService.getListings().pipe(first()).subscribe(
      data => {
        this.listings = data;
      }
    )
  }
}
