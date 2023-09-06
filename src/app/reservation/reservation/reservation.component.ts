import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {
  start_Date!: Date;
  end_Date!: Date;
  reasonReservation: string = '';
  vehicleId!: string | undefined;
  listResa: any = [];

  constructor(
    private reservationService: ReservationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.vehicleId = params['id']));
  }

  submitReservation() {
    let isReserved: boolean = false;
    this.reservationService.getListResa(this.vehicleId).subscribe((data) => {
      this.listResa = data;
      console.log('Liste réservation');
      console.log(this.listResa);
      //Vérification que le véhicule sélectionné ne soit pas déjà réservé pendant la période demandée
      for (let r of this.listResa) {
        let checkResaStartDates: boolean =
          this.start_Date >= r.start_Date && this.start_Date <= r.end_Date;
        let checkResaEndDates: boolean =
          this.end_Date >= r.start_Date && this.end_Date <= r.end_Date;
        let checkResaWide: boolean =
          this.start_Date <= r.start_Date && this.end_Date >= r.end_Date;
        if (checkResaStartDates || checkResaEndDates || checkResaWide) {
          if (!isReserved) {
            isReserved = true;
          }
        }
      }
      if(isReserved){
        throw new Error("Le véhicule est déjà réservé pour cette période, veuillez choisir un autre véhicule ou une autre période");
      }
      const reservationData = new ReservationData(
        this.start_Date,
        this.end_Date,
        this.reasonReservation,
        this.vehicleId
      );
      console.log('Données résa: ' + reservationData);
      this.reservationService
        .postNewReservation(reservationData)
        .subscribe((data: any) => {
          console.log('Data on submit: ' + data);
        });
    });
  }
}

class ReservationData {
  start_Date: Date;
  end_Date: Date;
  reason: string;
  vehicle;
  user;

  constructor(
    start_Date: Date,
    end_Date: Date,
    reason: string,
    vehicle: string | undefined
  ) {
    this.start_Date = start_Date;
    this.end_Date = end_Date;
    this.reason = reason;
    this.vehicle = { id: vehicle };
    this.user = { id: 2 };
  }
}
