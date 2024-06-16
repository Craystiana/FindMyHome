import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingFavouritesComponent } from './listing-favourites.component';

const routes: Routes = [
  {
    path: '',
    component: ListingFavouritesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListingFavouritesRoutingModule {}
