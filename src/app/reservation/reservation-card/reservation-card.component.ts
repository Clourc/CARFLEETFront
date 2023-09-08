import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation-card',
  templateUrl: './reservation-card.component.html',
  styleUrls: ['./reservation-card.component.css']
})
export class ReservationCardComponent implements OnInit{

  @Input() reservation: any;
  reservationPlaceCode: string = "";
  vehicleBrand: string = "";
  vehicleModel: string = "";
  vehiclePlace: string = "";
  resaStatus: string = "";
  today = new Date();

  resaStyleClass: string = "";
  
  ngOnInit(): void {
    this.vehiclePlace = this.reservation.vehicle.fleet.place;
    this.reservationPlaceCode = this.vehiclePlace.slice(0, 1);
    this.vehicleBrand = this.reservation.vehicle.model.brand.toUpperCase();
    this.vehicleModel = this.reservation.vehicle.model.modelName;

    this.resaStatus = this.setResaStatus();
    this.setBorderStyle(this.resaStatus);
  }

  setResaStatus(): string {
    const checkFinished = new Date(this.reservation.end_Date) < this.today;
    const checkToCome = new Date(this.reservation.start_Date) > this.today;
    console.log("today: " + this.today);
    console.log("Start date: " + new Date(this.reservation.start_Date));
    if(checkFinished){
      return "terminée";
    }
    if(checkToCome){
      return "à venir";
    }
    return "en cours";
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
