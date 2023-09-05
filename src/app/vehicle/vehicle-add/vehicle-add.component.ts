import { Component } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { VehicleService } from '../vehicle.service';
import { catalogueVehicle } from './catalogue';



@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.css']
})
export class VehicleAddComponent {

  addvehicleForm: NgForm;

  brand: string = ""
  modelId: number = 0;
  vehicle!: any;
  fleetId: number = 0;

  catalogueVehicle = catalogueVehicle;

  constructor(private vehicleService: VehicleService) {
  this.addvehicleForm = new NgForm([], []);
  }





  addVehicleSubmit() {
    if (this.addvehicleForm.valid) {
      const formData = this.addvehicleForm.value;
      this.vehicleService.addVehicle(formData).subscribe(
        (response) => {
          console.log('Véhicule ajouté avec succès !');
        },
        (error) => {
          console.log('Erreur lors de l\'ajout du véhicule' + error);

        }
      );


      this.vehicle = catalogueVehicle.find(vehicle => vehicle.model_id == this.modelId);
      this.vehicle = catalogueVehicle.find(vehicle => vehicle.fleet_id = this.fleetId);

      console.log(this.vehicle);

if (this.vehicle != null) {
  console.log("Véhicule ajouté avec succès !", this.vehicle);
} else {  console.log("Erreur lors de l'ajout du véhicule"); 
   }
  }
}
}














