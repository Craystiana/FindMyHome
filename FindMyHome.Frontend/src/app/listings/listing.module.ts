import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListingRoutingModule } from './listing-routing.module';
import { ListingOverviewComponent } from './listing-overview/listing-overview.component';
import { SelectModalComponent } from '../modals/select-modal/select-modal.component';
import { MapComponent } from '../modals/map/map.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListingRoutingModule
  ],
  declarations: [ListingOverviewComponent, SelectModalComponent]
})
export class ListingModule {}