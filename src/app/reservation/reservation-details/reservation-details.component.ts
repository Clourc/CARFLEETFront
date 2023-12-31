import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ReservationService } from '../reservation.service';
@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.css'],
})
export class ReservationDetailsComponent implements OnInit {
  reservationId!: string | undefined;
  reservationDetails: any = {};
  reservationStatus: string | undefined;
  reservationPlaceCode: string = '';

  userRole: string | null = localStorage.getItem('role');

  resaStyleClass: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private reservationService: ReservationService,
  ) {}

  ngOnInit(): void {
    this.reservationId = this.router.url.split('/').pop();
    this.http
      .get('http://localhost:8080/reservations/' + this.reservationId)
      .subscribe((data) => {
        this.reservationDetails = data;
        this.reservationDetails.vehicle.model.brand =
          this.reservationDetails.vehicle.model.brand.toUpperCase();
        this.reservationStatus = this.reservationService.setResaStatus(
          this.reservationDetails
        );
        this.reservationPlaceCode =
          this.reservationDetails.vehicle.fleet.place.slice(0, 1);

        this.setDotStyle(this.reservationStatus);
      });
  }

  setDotStyle(status: string): void {
    switch (status) {
      case 'à venir':
        this.resaStyleClass = 'dot-toCome';
        break;
      case 'en cours':
        this.resaStyleClass = 'dot-ongoing';
        break;
      case 'terminée':
        this.resaStyleClass = 'dot-ended';
    }
  }
}
