import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListingRoutingModule } from './listing-routing.module';
import { ListingOverviewComponent } from './listing-overview/listing-overview.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListingRoutingModule
  ],
  declarations: [ListingOverviewComponent]
})
export class ListingModule {}