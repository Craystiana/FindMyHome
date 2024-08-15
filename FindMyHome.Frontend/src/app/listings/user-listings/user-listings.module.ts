import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserListingsComponent } from './user-listings.component';
import { UserListingsRoutingModule } from './user-listings-routing.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserListingsRoutingModule
  ],
  declarations: [UserListingsComponent]
})
export class UserListingsModule {}
