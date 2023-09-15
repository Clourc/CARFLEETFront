import { Component, Input, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-reservation-card',
  templateUrl: './reservation-card.component.html',
  styleUrls: ['./reservation-card.component.css']
})
export class ReservationCardComponent implements OnInit{

  constructor(private reservationService: ReservationService) { }

  @Input() reservation: any;
  reservationPlaceCode: string = "";
  vehicleBrand: string = "";
  vehicleModel: string = "";
  vehiclePlace: string = "";
  resaStatus: string = "";

  resaStyleClass: string = "";
  
  ngOnInit(): void {
    this.vehiclePlace = this.reservation.vehicle.fleet.place;
    this.reservationPlaceCode = this.vehiclePlace.slice(0, 1);
    this.vehicleBrand = this.reservation.vehicle.model.brand.toUpperCase();
    this.vehicleModel = this.reservation.vehicle.model.modelName;

    this.resaStatus = this.reservationService.setResaStatus(this.reservation);
    this.setBorderStyle(this.resaStatus);
  }

  setBorderStyle(status: string): void {
    switch(status){
      case 'à venir':
        this.resaStyleClass = 'resa-toCome';
        break;
      case 'en cours':
        this.resaStyleClass = 'resa-ongoing';
        break;
      case 'terminée':
        this.resaStyleClass = 'resa-ended';
    }
  }
}
