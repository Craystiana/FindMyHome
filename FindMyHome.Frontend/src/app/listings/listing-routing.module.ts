import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingOverviewComponent } from './listing-overview/listing-overview.component';

const routes: Routes = [
  {
    path: '',
    component: ListingOverviewComponent
  },
  {
    path: 'detail',
    loadChildren: () => import('./listing-details/listing-details.module').then(m => m.ListingDetailsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListingRoutingModule {}