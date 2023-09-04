import { Component } from '@angular/core';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  start_Date!: Date;
  end_Date!: Date;
  reasonReservation: string = '';

  constructor(private reservationService : ReservationService){}

  submitReservation(){
    const reservationData = new ReservationData(this.start_Date, this.end_Date, this.reasonReservation)
    console.log("Reservation OK");
    console.log(reservationData);
    this.reservationService.postNewReservation(reservationData).subscribe((data: any) => {
      console.log("Data on submit: " + reservationData);
    });
  }
}

class ReservationData {
  start_Date: Date;
  end_Date: Date;
  reason: string;
  vehicle;
  user;

  constructor(start_Date: Date, end_Date: Date, reason: string){
    this.start_Date = start_Date;
    this.end_Date = end_Date;
    this.reason = reason;
    this.vehicle ={id: 2};
    this.user = {id: 2};
  }
}
