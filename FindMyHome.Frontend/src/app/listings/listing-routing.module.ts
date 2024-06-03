import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingOverviewComponent } from './listing-overview/listing-overview.component';

const routes: Routes = [
  {
    path: '',
    component: ListingOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListingRoutingModule {}