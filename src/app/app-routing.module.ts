import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './misc/not-found/not-found.component';
import { VehicleListComponent } from './vehicle/vehicle-list/vehicle-list.component';
import { LoginComponent } from './user/login/login.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: '**', component: NotFoundComponent },
  // Les routes que vous souhaitez protéger avec AuthGuard doivent être configurées avec canActivate
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
