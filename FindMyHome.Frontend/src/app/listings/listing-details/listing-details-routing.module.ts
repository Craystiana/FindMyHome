import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListingDetailsComponent } from './listing-details.component';

const routes: Routes = [
  {
    path: '',
    component: ListingDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListingDetailsRoutingModule {}
