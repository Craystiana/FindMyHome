import { Component, OnInit } from '@angular/core';
import { ListingModel } from 'src/app/models/listing/listing.model';
import { ListingService } from '../listing.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { first } from 'rxjs';

@Component({
  selector: 'app-user-listings',
  templateUrl: './user-listings.component.html',
  styleUrls: ['./user-listings.component.scss'],
})
export class UserListingsComponent  implements OnInit {
  public listings: ListingModel[] = [];
  public isLoading = false;

  constructor(private listingService: ListingService, private router: Router, private toastCtrl: ToastController) { }

  ngOnInit(): void {
    this.getListings();
  }

  getListings(){
    this.isLoading = true;
    this.listingService.getOwnListings().pipe(first()).subscribe(
      data =>{
        this.listings = data;
        this.isLoading = false;
      },
      error => {
        this.toastCtrl.create({
          message: 'Unable to get the listings',
          duration: 5000,
          position: 'bottom',
          color: 'danger',
          buttons: ['Dismiss']
        }).then((el) => el.present());
        
        this.isLoading = false;
    });
  }

}
