import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingEditComponent } from './listing-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ListingEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListingEditRoutingModule {}
