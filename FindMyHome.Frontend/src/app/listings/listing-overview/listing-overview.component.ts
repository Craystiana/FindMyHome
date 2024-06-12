import { Component, OnInit } from '@angular/core';
import { ListingService } from '../listing.service';
import { ListingModel } from 'src/app/models/listing/listing.model';
import { first, take } from 'rxjs';
import { ListingData } from 'src/app/models/listing/listing-data.model';
import { Router } from '@angular/router';
import { ListingQuery } from 'src/app/models/listing/listing-query.model';
import { ToastController } from '@ionic/angular';
import { SortType } from 'src/app/common/sort-type';

@Component({
  selector: 'app-listing-overview',
  templateUrl: './listing-overview.component.html',
  styleUrls: ['./listing-overview.component.scss'],
})
export class ListingOverviewComponent implements OnInit {
  public listings: ListingModel[] = [];
  public searchTerm: string = '';
  public listingType: number[] = [];
  public listingCounty: number[] = [];
  public listingCity: number[] = [];
  public sortBy: number = 0;
  public listingData: ListingData = new ListingData();

  public get sortType() : typeof SortType{
    return SortType;
  }

  public isLoading = false;

  constructor(private listingService: ListingService, private router: Router, private toastCtrl: ToastController) { }

  ionViewWillEnter() {
    this.fetchStaticData();
  }

  ngOnInit(): void {
    this.fetchStaticData();
    this.getListings();
  }

  fetchStaticData(){
    this.listingService.getListingData().pipe(take(1)).subscribe(
      data => {
        this.listingData = data;
      }
    );
  }

  getListings(){
    this.isLoading = true;

    var model = new ListingQuery(this.listingType,
                             this.listingCounty,
                             this.listingCity,
                             this.sortBy,
                             this.searchTerm);

    this.listingService.getListings(model).pipe(first()).subscribe(
      data =>{
        this.listings = data;
        this.isLoading = false;
      },
      error => {
        this.toastCtrl.create({
          message: 'Unable to get the car list',
          duration: 5000,
          position: 'bottom',
          color: 'danger',
          buttons: ['Dismiss']
        }).then((el) => el.present());
        
        this.isLoading = false;
    });
  }

  addPage(){
    this.router.navigateByUrl("/listing/edit");
  }
}
