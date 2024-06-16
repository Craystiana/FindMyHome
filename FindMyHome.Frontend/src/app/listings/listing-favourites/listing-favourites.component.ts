import { Component, OnInit } from '@angular/core';
import { ListingService } from '../listing.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ListingModel } from 'src/app/models/listing/listing.model';
import { first } from 'rxjs';

@Component({
  selector: 'app-listing-favourites',
  templateUrl: './listing-favourites.component.html',
  styleUrls: ['./listing-favourites.component.scss'],
})
export class ListingFavouritesComponent  implements OnInit {
  public listings: ListingModel[] = [];
  public isLoading = false;

  constructor(private listingService: ListingService, private router: Router, private toastCtrl: ToastController) { }

  ngOnInit(): void {
    this.getListings();
  }

  getListings(){
    this.isLoading = true;
    this.listingService.getFavouriteListings().pipe(first()).subscribe(
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
}
