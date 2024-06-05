import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ListingModel } from 'src/app/models/listing/listing.model';
import { ListingService } from '../listing.service';
import { take } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.scss'],
})
export class ListingDetailsComponent implements OnInit {
  public listing: ListingModel | undefined;
  private listingId: number | undefined;

  constructor(private route: ActivatedRoute,
              private loadingController: LoadingController,
              private listingService: ListingService,
              private router: Router,
              public authService: AuthService,
              private toastCtrl: ToastController
  ) { }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Loading listing. Please wait...',
      backdropDismiss: false
    });

    await loading.present();

    this.route.queryParams.subscribe(params => {
      if(params) {
        this.listingId = params['listingId'];
      }

      if(this.listingId === undefined) {
        loading.dismiss();
        this.router.navigateByUrl("/listings");
      }
    });

    if (this.listingId) {
    this.listingService.getListing(this.listingId)
      .pipe(take(1))
      .subscribe(data => {
        this.listing = data;
        loading.dismiss();
      })
    }
  }

  onDelete(){
    if (this.listingId) {
      this.listingService.delete(this.listingId)
      .pipe(take(1))
      .subscribe(
        data => {
          if(data === true){
            this.router.navigateByUrl("/listings");
            this.toastCtrl.create({
              message: 'Listing removed successfully',
              duration: 5000,
              position: 'bottom',
              color: 'warning',
              buttons: ['Dismiss']
            }).then((el) => el.present());
          } else {
          this.presentError();
          }
        },
        error => {
          this.presentError();
        }
      );
    }
  }

  presentError(){
    this.toastCtrl.create({
      message: 'Failed to remove listing',
      duration: 5000,
      position: 'bottom',
      color: 'danger',
      buttons: ['Dismiss']
    }).then((el) => el.present());
  }

  editPage(){
    this.router.navigateByUrl("/listings/edit?listingId=" + this.listingId);
  }

}
