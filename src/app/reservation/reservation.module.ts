import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ReservationComponent } from './reservation/reservation.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ReservationCardComponent } from './reservation-card/reservation-card.component';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';
import { ReservationCancelComponent } from './reservation-cancel/reservation-cancel.component';
import { userGuard } from '../auth.guard';


const resaRoutes: Routes = [
  { path: "vehicles/:id/reserve", component: ReservationComponent, canActivate: [userGuard] },
  { path: "reservations", component: ReservationListComponent, canActivate: [userGuard]},
  { path: "reservations/:id", component: ReservationDetailsComponent, canActivate: [userGuard]},
 ];

@NgModule({
  declarations: [
    ReservationComponent,
    ReservationListComponent,
    ReservationCardComponent,
    ReservationDetailsComponent,
    ReservationCancelComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(resaRoutes)
  ],
  exports: [
    ReservationCardComponent
  ]

})
export class ReservationModule { }
