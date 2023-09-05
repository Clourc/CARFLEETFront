import { Component } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { catalogueVehicle, vehicleAdd } from './catalogue';



@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.css']
})
export class VehicleAddComponent {

  brand: string = ""
  modelId: number = 0;
  vehicle!: any;
  fleetId: number = 0;
  licencePlate: string = "";
  catalogueVehicle = catalogueVehicle;

  constructor(private vehicleService: VehicleService) {
  }
  addVehicleSubmit() {
    this.vehicle = catalogueVehicle.find(vehicle => vehicle.model_id == this.modelId);
    this.vehicle.fleet_id = this.fleetId;
    this.vehicle.licencePlate = this.licencePlate;

    console.log(this.vehicle);


    this.vehicleService.addVehicle(this.vehicle).subscribe(
      (response) => {
        if (this.vehicle != null) {
          console.log("Véhicule ajouté avec succès !" + this.vehicle);
        } else {
          console.log("Erreur lors de l'ajout du véhicule");
        }


      }
    );

  }
}















