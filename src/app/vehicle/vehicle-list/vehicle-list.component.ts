import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { HttpClient } from '@angular/common/http';
import { ReservationService } from 'src/app/reservation/reservation.service';
import { filter, reduce } from 'rxjs';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
})
export class VehicleListComponent implements OnInit {
  vehiclesToDisplay: any[] = [];
  maxShownVehicles: number = 10;
  savedVehicles: any;
  reservationStart: Date | any;
  reservationEnd: Date | any;
  
  constructor(
    private http: HttpClient,
    private vehicleService: VehicleService,
    private reservationService: ReservationService
  ) {}

  recherche(){
    this.vehiclesToDisplay = [];
    return this.vehicleService.recherche(this.vehiclesToDisplay, this.savedVehicles, this.reservationStart, this.reservationEnd);
  }

  ngOnInit(): void {
    this.vehicleService.getVehicles().subscribe(
      (data) => {
        this.savedVehicles = data;
        this.vehiclesToDisplay = data;
        console.log("liste")
        console.log(data);
      }
    );
  }
}
