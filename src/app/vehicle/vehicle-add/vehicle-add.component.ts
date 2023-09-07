import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';




@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.css']
})
export class VehicleAddComponent implements OnInit {

  brand: string = "";
  modelId: number = 0;
  vehicle: any= {};
  fleetId: any;
  licencePlate: string = "";
  vehicleModelName: string = "";
  catalogueVehicle = this.vehicleService.catalogueVehicle;

  catalogueBrands = this.vehicleService.catalogueBrands;//catalogueBrands = ["renault", "citroen", "peugeot"]; tableau de strings
  catalogueModels = this.vehicleService.catalogueModels;// catalogueModels = [{renault: [ { modelName: "ZOE R110", id: 1 },{ modelName: "CLIO RS Line", id: 2 }, etc...]tableau d'objets
  catalogueFleets = this.vehicleService.catalogueFleets;

  constructor(private vehicleService: VehicleService) {
  }

  listModel: any = []; //[ { id:1, type:citadine, nbSeats:5, energy:essence, nbDoors:5, image: "https://i.imgur.com/FZ5BdEW.png", modelName: "ZOE R110" }, etc...] tableau d'objets
  
  modelIdView: any;

  ngOnInit(): void {
    fetch('http://localhost:8080/models')
      .then(response => response.json())
      .then(data => {
        this.listModel = data;
        console.log(this.listModel);
      }
      )
  }

  viewModel() {
   //.find renvoie le premier élément correspondant à la condition donnée dans la fonction
    this.vehicle = this.listModel.find((vehicle:any) => vehicle.modelName == this.vehicleModelName);
   console.log(this.vehicle);

  }



  addVehicleSubmit(): void {
    this.vehicle = this.catalogueVehicle.find(vehicle => vehicle.model.id == this.modelId);
    this.vehicle.fleet.id = this.fleetId;
    this.vehicle.licencePlate = this.licencePlate;

    console.log(this.vehicle);

    this.vehicleService.addVehicle(this.vehicle).subscribe(
      (response) => {
        if (this.vehicle != null) {
          console.log(response);
          console.log("Véhicule ajouté avec succès !" + this.vehicle);
        } else {
          console.log("Erreur lors de l'ajout du véhicule");
        }
      }
    );

  }
}















