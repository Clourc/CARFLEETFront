import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './misc/not-found/not-found.component';
import { VehicleListComponent } from './vehicle/vehicle-list/vehicle-list.component';
import { LoginComponent } from './user/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
  { path: 'users/login', component: LoginComponent },
  { path: 'connexion', component: VehicleListComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
