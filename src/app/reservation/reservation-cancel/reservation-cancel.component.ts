import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-reservation-cancel',
  templateUrl: './reservation-cancel.component.html',
  styleUrls: ['./reservation-cancel.component.css']
})
export class ReservationCancelComponent implements OnInit {

  reservationCancel: any = {};
  reservationId!: string | null;
  reservationStatus: string | undefined;
  constructor(private http: HttpClient, private route: ActivatedRoute, private reservationService: ReservationService) { }

  reservationList: any[] = [];

  ngOnInit(): void {
    this.reservationId = this.route.snapshot.paramMap.get('id');
    this.http
      .get('http://localhost:8080/reservations/' + this.reservationId)
      .subscribe((data) => {
        console.log(data);
        this.reservationCancel = data;

        this.reservationCancel.vehicle.model.brand = this.reservationCancel.vehicle.model.brand.toUpperCase();
        this.reservationStatus = this.reservationService.setResaStatus(this.reservationCancel);
      });

  }
  cancelConfirm() {
    this.http
      .delete(`http://localhost:8080/reservations/${this.reservationId}/delete`)
      .subscribe((data) => {
        console.log(data);
        this.reservationCancel = data;
      });
  }
}




