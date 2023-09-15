import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ReservationService } from '../reservation.service';
@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.css']
})
export class ReservationDetailsComponent implements OnInit {
  reservationId!: string | undefined;
  reservationDetails: any = {};
  reservationStatus: string | undefined;

  constructor(private http: HttpClient, private router: Router, private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.reservationId = this.router.url.split('/').pop();
    //console.log('Url: ' + this.router.url);
    //console.log('Reservation Id: ' + this.reservationId);
    this.http
      .get('http://localhost:8080/reservations/' + this.reservationId)
      .subscribe((data) => {
        console.log(data);
        this.reservationDetails = data;
        console.log("&&&", this.reservationDetails.reason)
        this.reservationDetails.vehicle.model.brand = this.reservationDetails.vehicle.model.brand.toUpperCase();
        this.reservationStatus = this.reservationService.setResaStatus(this.reservationDetails);
      });
    }
}


