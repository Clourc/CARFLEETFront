import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { HttpClient } from '@angular/common/http';
import { ReservationService } from 'src/app/reservation/reservation.service';
import { filter, reduce } from 'rxjs';
import { FormControl, FormsModule } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';

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

  constructor(private vehicleService: VehicleService) {}

  recherche(){
    this.vehiclesToDisplay = []; console.log("test ", this.vehiclesToDisplay)
    return this.vehicleService.recherche(this.vehiclesToDisplay, this.savedVehicles, this.reservationStart, this.reservationEnd);
    
   
  }

  /* recherche() {
    // this.vehicleService.recherche(this.reservationList)
    this.vehiclesToDisplay = [];
    this.filterResult = [];
    console.log("test vide");
    console.log(this.vehiclesToDisplay)


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
        console.log("filter results", this.filterResult);
      }
    }
    this.savedVehicles.forEach((vehicle: any) => {
      // Liste de tous les véhicule 
      if (this.filterResult.length > 0) {
        // filterResult est la liste des véhicule réservé dans les dates choisies 
        for (let hideVehicle of this.filterResult) {
          if (hideVehicle.id != vehicle.id) {
            // On check si le véhicule de la liste de tous les véhicule 
            // n'est pas dans la liste des véhicule réservé pour l'afficher 
            console.log('Test');
            this.vehiclesToDisplay.push(vehicle);
          }
        }
      } else {
        // Si la liste de véhicule réservé est vide on affiche tous les véhicules
        // Parce qu'ils sont tous disponible
        this.vehiclesToDisplay = this.savedVehicles;
      }
    });
    console.log('display');
    console.log(this.vehiclesToDisplay);
    // return la liste de véhicule disponible par date 
  } */

  ngOnInit(): void {
    this.vehicleService.getVehicles().subscribe((data) => {
      this.savedVehicles = data;
      this.vehiclesToDisplay = data;
      console.log('liste');
      console.log('vehicles dataaaaaaa', data);
    });
  }
}
