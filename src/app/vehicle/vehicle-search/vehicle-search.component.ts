import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-vehicle-search',
  templateUrl: './vehicle-search.component.html',
  styleUrls: ['./vehicle-search.component.css']
})

export class VehicleSearchComponent implements OnInit{

  vehicleToDisplay:any[]=[];
  constructor(public vehicleService: VehicleService) { }

  ngOnInit(): void {
  }



 recherche(form:any){
    console.log(form.value);
  
    this.vehicleService.getVehicles().subscribe(
      (data) => {
        this.vehicleToDisplay = data;
        console.log(data);
      }
 
    );}
    }