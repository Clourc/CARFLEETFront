import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ReservationCardComponent } from './reservation-card/reservation-card.component';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';
import { ReservationCancelComponent } from './reservation-cancel/reservation-cancel.component';
import { ReservationConfirmComponent } from './reservation-confirm/reservation-confirm.component';



@NgModule({
  declarations: [
    ReservationComponent,
    ReservationListComponent,
    ReservationCardComponent,
    ReservationDetailsComponent,
    ReservationCancelComponent,
    ReservationConfirmComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ReservationModule { }
