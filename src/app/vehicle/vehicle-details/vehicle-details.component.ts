import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {


vehicleId: number;
vehicle: any;


  constructor(private vehicleService: VehicleService ,private route: ActivatedRoute ) { 

    this.vehicleId = 0;
  }

  ngOnInit(): void {
    this.vehicleId = this.route.snapshot.params['id'];

  // Utilisez l'ID du véhicule pour obtenir les détails du véhicule depuis le service
  this.vehicleService.getVehiclebyId(this.vehicleId).subscribe(data => {
    this.vehicle = data;
    console.log(data);
  });
}
}