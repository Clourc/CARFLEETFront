import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AdminInterfaceComponent } from './admin-interface/admin-interface.component';
import { RouterModule, Routes } from '@angular/router';
import { ReservationModule } from '../reservation/reservation.module';

const userRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent},
  { path: 'admin', component: AdminInterfaceComponent}
  

];

@NgModule({
  declarations: [
    LoginComponent,
    AdminInterfaceComponent,
  ],
  imports: [
    CommonModule,
    ReservationModule,
    FormsModule,
    RouterModule.forChild(userRoutes)
  ],
})
export class UserModule {}
