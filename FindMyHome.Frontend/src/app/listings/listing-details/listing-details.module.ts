import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListingDetailsComponent } from './listing-details.component';
import { ListingDetailsRoutingModule } from './listing-details-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListingDetailsRoutingModule
  ],
  declarations: [ListingDetailsComponent]
})
export class ListingDetailsModule {}
