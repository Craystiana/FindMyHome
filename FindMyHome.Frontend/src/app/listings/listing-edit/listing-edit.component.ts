import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingModel } from 'src/app/models/listing/listing.model';
import { ListingService } from '../listing.service';
import { ToastController } from '@ionic/angular';
import { first, take } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ListingEdit } from 'src/app/models/listing/listing-edit.model';
import { ListingData } from 'src/app/models/listing/listing-data.model';
import { google } from "google-maps";

@Component({
  selector: 'app-listing-edit',
  templateUrl: './listing-edit.component.html',
  styleUrls: ['./listing-edit.component.scss'],
})
export class ListingEditComponent {
  public listingData : ListingData | undefined;
  public isLoading: boolean = false;
  public listingId : number = 0;
  public listing: ListingEdit | undefined;
  public pictures : string[] = [];
  public isPictureLoaded = true;
  public map: google.maps.Map | undefined;
  public latitude: number | undefined;
  public longitude: number | undefined;
  public GoogleAutocomplete: google.maps.places.AutocompleteService;
  public autocomplete: any;
  public autocompleteItems: any;
  public geocoder: google.maps.Geocoder;
  public marker: google.maps.Marker | undefined;

  constructor(private router: Router, private listingService: ListingService, private toastCtrl: ToastController, private route: ActivatedRoute, private zone: NgZone) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
    this.geocoder = new google.maps.Geocoder;
   }

  ionViewWillEnter(){
    this.loadData();
    this.createMap();
  }

  loadData(){
    this.route.queryParams.subscribe(params => {
      if (params['listingId']) {
        this.listingId = parseInt(params['listingId']);
      }
    });

    this.listingService.getListingData().pipe(take(1)).subscribe(
      data => {
        this.listingData = data;
      }
    );

    if(this.listingId !== 0){
      this.listingService.getListingEdit(this.listingId).pipe(take(1)).subscribe(
        data => {
          this.listing = data;
          if (data.latitude && data.longitude) {
            this.latitude = data.latitude;
            this.longitude = data.longitude;
            this.setMarker(new google.maps.LatLng(this.latitude, this.longitude));
          }
        }
      );
    }
  }

  onEdit(editForm: NgForm){
    this.isLoading = true;
    var model = new ListingEdit(this.listingId,
                            editForm.value.listingType,
                            editForm.value.listingMarketingType,
                            editForm.value.city,
                            editForm.value.county,
                            editForm.value.title,
                            editForm.value.description,
                            editForm.value.location,
                            editForm.value.price,
                            this.pictures,
                            this.latitude,
                            this.longitude,
                            editForm.value.isClosed);               
    
    this.listingService.edit(model).pipe(first()).subscribe(
      data =>{
        if(data==true){
          if(this.listingId !== undefined && this.listingId !== 0){
            this.router.navigateByUrl('/listing/detail?listingId=' + this.listingId);
          }
          else{
            this.router.navigateByUrl('/listing');
          }
          this.toastCtrl.create({
            message: this.listingId !== undefined ? 'Listing edited succesfully.' : 'Listing added succesfully.',
            duration: 5000,
            position: 'bottom',
            color: 'success',
            buttons: ['Dismiss']
          }).then((el) => el.present());
        }
        else{
          this.toastCtrl.create({
            message: 'Something went wrong. Please try again.',
            duration: 5000,
            position: 'bottom',
            color: 'danger',
            buttons: ['Dismiss']
          }).then((el) => el.present());
        }
        this.isLoading = false;
      },
      error => {
        this.toastCtrl.create({
          message: 'Something went wrong. Please try again.',
          duration: 5000,
          position: 'bottom',
          color: 'danger',
          buttons: ['Dismiss']
        }).then((el) => el.present());
        
        this.isLoading = false;
      }
    )           
  }

  onDocumentUpload($event: any) {
    this.pictures = [];
    Array.from($event.target.files).forEach((photo: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(photo);
      this.isPictureLoaded = false;

      reader.onload = () => {
        var picture = reader.result?.toString().split('base64,').pop();
        if (picture) {
          this.pictures?.push(picture);
          this.isPictureLoaded = true;
        }
      }
    });
  }

  async createMap() {
    var mapElement = document.getElementById('map') as HTMLElement;
    this.map = new google.maps.Map(mapElement, {
      center: { lat: this.latitude ?? 44.439663, lng: this.longitude ?? 26.096306 },
      zoom: 15
    });

    google.maps.event.addListener(this.map, 'click', (event: any) => {
      this.setMarker(event.latLng)
    });
  }

  setMarker(location: google.maps.LatLng) {
    this.marker?.setMap(null);
    this.marker = new google.maps.Marker({
      position: location,
      map: this.map,
    });
    this.map?.setCenter(location);
    this.latitude = location.lat();
    this.longitude = location.lng();
  }

  updateSearchResults() {
    if (this.autocomplete.input === '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
    (predictions: any) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions?.forEach((prediction: any) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
  }

  selectSearchResult(item: any) {
    this.autocompleteItems = [];
  
    this.geocoder.geocode({'placeId': item.place_id}, (results: any, status: any) => {
      if(status === 'OK' && results && results[0]){
        this.setMarker(results[0].geometry.location);
      }
    })
  }
}
