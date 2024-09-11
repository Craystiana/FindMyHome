import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListingDetailsComponent } from './listing-details.component';
import { ListingDetailsRoutingModule } from './listing-details-routing.module';
import { MapModule } from 'src/app/modals/map/map.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListingDetailsRoutingModule,
    MapModule
  ],
  declarations: [ListingDetailsComponent]
})
export class ListingDetailsModule {}
