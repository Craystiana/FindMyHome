import { Component, OnInit, ViewChild } from '@angular/core';
import { ListingService } from '../listing.service';
import { ListingModel } from 'src/app/models/listing/listing.model';
import { first, take } from 'rxjs';
import { ListingData } from 'src/app/models/listing/listing-data.model';
import { Router } from '@angular/router';
import { ListingQuery } from 'src/app/models/listing/listing-query.model';
import { IonModal, ToastController } from '@ionic/angular';
import { SortType } from 'src/app/common/sort-type';
import { Generic } from 'src/app/models/generic/generic.model';

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
  public listingMarketingType: number[] = [];
  public sortBy: number[] = [];
  public listingData: ListingData = new ListingData();
  public sorting: Generic[] = [{id: this.sortType.Title, name: 'Titlu'}, {id: this.sortType.Price, name: 'Pret'}, {id: this.sortType.CreationDate, name: 'Data'}]
  @ViewChild('typemodal', { static: true }) typemodal!: IonModal;
  @ViewChild('marketingModal', { static: true }) marketingModal!: IonModal;
  @ViewChild('countymodal', { static: true }) countymodal!: IonModal;
  @ViewChild('citymodal', { static: true }) citymodal!: IonModal;
  @ViewChild('sortmodal', { static: true }) sortmodal!: IonModal;

  typeSelectionChanged(listingTypes: any) {
    this.listingType = listingTypes as number[];
    this.typemodal.dismiss();
    this.getListings()
  }

  marketingTypeSelectionChanged(listingMarketingTypes: any) {
    this.listingMarketingType = listingMarketingTypes as number[];
    this.marketingModal.dismiss();
    this.getListings()
  }

  countiesSelectionChanged(counties: any) {
    this.listingCounty = counties as number[];
    this.countymodal.dismiss();
    this.getListings()
  }

  citiesSelectionChanged(cities: any) {
    this.listingCity = cities as number[];
    this.citymodal.dismiss();
    this.getListings()
  }

  sortSelectionChanged(sort: any) {
    this.sortBy = sort as number[];
    this.sortmodal.dismiss();
    this.getListings()
  }

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
                             this.listingMarketingType,
                             this.listingCity,
                             this.listingCounty,
                             this.sortBy[0],
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
