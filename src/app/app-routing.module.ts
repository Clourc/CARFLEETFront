import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './misc/not-found/not-found.component';
import { VehicleListComponent } from './vehicle/vehicle-list/vehicle-list.component';

const routes: Routes = [
   {path: '', redirectTo:'vehicles' , pathMatch: 'full'},
   {path:'**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
