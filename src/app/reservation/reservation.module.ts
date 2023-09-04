import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ReservationComponent } from './reservation/reservation.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ReservationCardComponent } from './reservation-card/reservation-card.component';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';
import { ReservationCancelComponent } from './reservation-cancel/reservation-cancel.component';
import { ReservationConfirmComponent } from './reservation-confirm/reservation-confirm.component';

const resaRoutes: Routes = [
  { path: "reserve", component: ReservationComponent }
];

@NgModule({
  declarations: [
    ReservationComponent,
    ReservationListComponent,
    ReservationCardComponent,
    ReservationDetailsComponent,
    ReservationCancelComponent,
    ReservationConfirmComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(resaRoutes)
  ]
})
export class ReservationModule { }
