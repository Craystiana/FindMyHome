import { Component, NgZone, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingModel } from 'src/app/models/listing/listing.model';
import { ListingService } from '../listing.service';
import { IonModal, ToastController } from '@ionic/angular';
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
  public latitude: number | undefined;
  public longitude: number | undefined;
  @ViewChild('modal', { static: true }) modal!: IonModal;

  constructor(private router: Router, private listingService: ListingService, private toastCtrl: ToastController, private route: ActivatedRoute) {}

  ionViewWillEnter(){
    this.loadData();
  }

  locationChanged(location: any) {
    this.latitude = location.latitude;
    this.longitude = location.longitude;
    this.modal.dismiss();
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
            // this.setMarker(new google.maps.LatLng(this.latitude, this.longitude));
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
                            editForm.value.county,
                            editForm.value.city,
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
}
