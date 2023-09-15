import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ReservationComponent } from './reservation/reservation.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ReservationCardComponent } from './reservation-card/reservation-card.component';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';
import { ReservationCancelComponent } from './reservation-cancel/reservation-cancel.component';


const resaRoutes: Routes = [
  { path: "vehicles/:id/reserve", component: ReservationComponent },
  { path: "reservations", component: ReservationListComponent},
  { path: "admin/reservations", component: ReservationDetailsComponent},
  { path: "reservations/:id", component: ReservationDetailsComponent},
  { path: "reservations/:id/cancel", component: ReservationCancelComponent}
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
