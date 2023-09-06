import { Component,OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';




@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.css']
})
export class VehicleAddComponent implements OnInit{

  brand: string = ""
  modelId: number = 0;
  vehicle!: any;
  fleetId: any;
  licencePlate: string = "";
  catalogueVehicle = this.vehicleService.catalogueVehicle;

  catalogueBrands = this.vehicleService.catalogueBrands;
  catalogueModels = this.vehicleService.catalogueModels;
  catalogueFleets = this.vehicleService.catalogueFleets;

  constructor(private vehicleService: VehicleService) {
  }

ngOnInit(): void {
    fetch('http://localhost:8080/models/{id}')
    .then(response => response.json())
    .then(data => {
      this.catalogueVehicle = data;
      console.log(data);
          }
    )
    
}



  addVehicleSubmit() {
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





   /* trouvervehicule(form:any){
      console.log(form.value);
      //this.vehiculeService.getVehicles();
      fetch('http://localhost:8080/vehicules')
        .then(response => response.json())
        .then(data => {
          this.listVehicules = data;
          console.log(data);
        }
        )
    }*/





  }
}















