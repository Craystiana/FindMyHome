import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListingEditComponent } from './listing-edit.component';
import { ListingEditRoutingModule } from './listing-edit-routing.module';
import { MapModule } from 'src/app/modals/map/map.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListingEditRoutingModule,
    MapModule
  ],
  declarations: [ListingEditComponent]
})
export class ListingEditModule {}
