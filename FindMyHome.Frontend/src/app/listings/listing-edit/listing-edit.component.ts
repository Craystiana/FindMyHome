import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingModel } from 'src/app/models/listing/listing.model';
import { ListingService } from '../listing.service';
import { ToastController } from '@ionic/angular';
import { first, take } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ListingEdit } from 'src/app/models/listing/listing-edit.model';
import { ListingData } from 'src/app/models/listing/listing-data.model';

@Component({
  selector: 'app-listing-edit',
  templateUrl: './listing-edit.component.html',
  styleUrls: ['./listing-edit.component.scss'],
})
export class ListingEditComponent  implements OnInit {
  public listingData : ListingData | undefined;
  public isLoading: boolean = false;
  public listingId : number = 0;
  public listing: ListingModel | undefined;
  public pictureBase64 : string | undefined;
  public isPictureLoaded = true;

  constructor(private router: Router, private listingService : ListingService, private toastCtrl: ToastController, private route: ActivatedRoute,) { }

  ngOnInit() {
    this.loadData();
  }

  ionViewWillEnter(){
    this.loadData();
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

    if(this.listingId !== undefined){
      this.listingService.getListing(this.listingId).pipe(take(1)).subscribe(
        data => {
          this.listing = data;
        }
      );
    }
  }

  onEdit(editForm: NgForm){
    if (this.listingId) {
      this.isLoading = true;
      var model = new ListingEdit(this.listingId,
                              editForm.value.carType,
                              editForm.value.carClass,
                              editForm.value.carBrand,
                              editForm.value.licensePlate,
                              editForm.value.odometer,
                              editForm.value.price,
                              this.pictureBase64);               
      
      this.listingService.edit(model).pipe(first()).subscribe(
        data =>{
          if(data==true){
            if(this.listingId !== undefined){
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
  }

  onDocumentUpload($event: any) {
    const reader = new FileReader();

    reader.readAsDataURL($event.target.files.item(0));
    this.isPictureLoaded = false;

    reader.onload = () => {
      this.pictureBase64 = reader.result?.toString().split('base64,').pop();
      this.isPictureLoaded = true;
    }
  }

}
