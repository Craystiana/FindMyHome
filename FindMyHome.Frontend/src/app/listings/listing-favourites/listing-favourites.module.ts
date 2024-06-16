import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListingFavouritesComponent } from './listing-favourites.component';
import { ListingFavouritesRoutingModule } from './listing-favourites-routing.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListingFavouritesRoutingModule
  ],
  declarations: [ListingFavouritesComponent]
})
export class ListingFavouritesModule {}
