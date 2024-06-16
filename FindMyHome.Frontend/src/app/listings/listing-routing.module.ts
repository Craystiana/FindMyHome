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
  },
  {
    path: 'edit',
    loadChildren: () => import('./listing-edit/listing-edit.module').then( m => m.ListingEditModule)
  },
  {
    path: 'favourites',
    loadChildren: () => import('./listing-favourites/listing-favourites.module').then(m => m.ListingFavouritesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListingRoutingModule {}