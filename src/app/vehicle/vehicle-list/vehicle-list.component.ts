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
  reservationList: any;
  filterResult: any[] = [];
  constructor(
    private http: HttpClient,
    private vehicleService: VehicleService,
    private reservationService: ReservationService
  ) {}

  recherche(form: any) {
    this.vehiclesToDisplay = [];
    this.filterResult = [];
    console.log("test vide");
    console.log(this.vehiclesToDisplay)

    console.log(form.value);

    for (let i = 0; i < this.reservationList.length; i++) {
      let checkResaStartDates: boolean =
        this.reservationStart >= this.reservationList[i].start_Date &&
        this.reservationStart <= this.reservationList[i].end_Date;
      let checkResaEndDates: boolean =
        this.reservationEnd >= this.reservationList[i].start_Date &&
        this.reservationEnd <= this.reservationList[i].end_Date;
      let checkResaWide: boolean =
        this.reservationStart <= this.reservationList[i].start_Date &&
        this.reservationEnd >= this.reservationList[i].end_Date;
      if (checkResaStartDates || checkResaEndDates || checkResaWide) {
        console.log('vehicle: ');
        this.filterResult.push(this.reservationList[i].vehicle);
        console.log(this.filterResult);
      }
    }
    this.savedVehicles.forEach((vehicle: any) => {
      if (this.filterResult.length > 0) {
        for (let hideVehicle of this.filterResult) {
          if (hideVehicle.id != vehicle.id) {
            console.log('Test');
            this.vehiclesToDisplay.push(vehicle);
          }
        }
      } else {
        this.vehiclesToDisplay = this.savedVehicles;
      }
    });
    console.log('display');
    console.log(this.vehiclesToDisplay);
  }

  ngOnInit(): void {
    this.vehicleService.getVehicles().subscribe(
      (data) => {
        this.savedVehicles = data;
        console.log("liste")
        console.log(data);
      },
      (error) => {
        console.error('Erreur dans la récupération des véhicules:', error);
      }
    );

    this.reservationService.getListResa().subscribe((data) => {
      this.reservationList = data;
      this.vehiclesToDisplay=this.savedVehicles
    });
  }
}
