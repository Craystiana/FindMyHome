import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListingsComponent } from './user-listings.component';

const routes: Routes = [
  {
    path: '',
    component: UserListingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserListingsRoutingModule {}
