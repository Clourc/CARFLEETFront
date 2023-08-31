import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  //private listVehicles = [];

  constructor() { }


  /*getVehicles() {
    fetch('http://localhost:8080/vehicules')
      .then(response => response.json())
      .then(data => {
        this.listVehicles = data;
        console.log(data);
      }
      )
      return this.listVehicles;
  }*/
}