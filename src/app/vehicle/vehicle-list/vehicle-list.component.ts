import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit{
  vehiclesToDisplay:any[]=[];
  maxShownVehicles:number=10;
  savedVehicles:any;

  constructor(private http:HttpClient,private vehicleService: VehicleService) { }
  recherche(form:any){
    console.log(form.value)};
 
  ngOnInit(): void {
    this.vehicleService.getVehicles().subscribe(
      (data) => {
        this.savedVehicles=data;
        console.log(data);
        if (data.length ===1) {
           this.vehiclesToDisplay.push(data[0]);
       } else {
        for (let i = 0; i < this.maxShownVehicles && i < data.length; i++) {
          this.vehiclesToDisplay.push(data[i]);
        }
      }
  },
  (error) => {
    console.error('Erreur dans la récupération des véhicules:', error);
 
  
  }
  );

  }}
