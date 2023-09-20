import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.css'],
})
export class VehicleAddComponent implements OnInit {
  brand: string = '';
  modelId: number = 0;
  vehicle: any = {};
  fleetId: number = 0;
  licencePlate: string = '';
  vehicleModelName: string = '';

  constructor(
    private vehicleService: VehicleService,
    private userService: UserService,
    private http: HttpClient
  ) {}

  listModel: any = []; //[ { id:1, type:citadine, nbSeats:5, energy:essence, nbDoors:5, image: "https://i.imgur.com/FZ5BdEW.png", modelName: "ZOE R110" }, etc...] tableau d'objets
  listBrands: string[] = [];
  listModelFiltered: any[] = [];
  listFleets: any[] = [];

  modelIdView: any;

  ngOnInit(): void {
    this.http.get('http://localhost:8080/models').subscribe((data: any) => {
      this.listModel = data;
      console.log('Liste models :', this.listModel);
      for (let model of this.listModel) {
        if (!this.listBrands.includes(model.brand)) {
          this.listBrands.push(model.brand);
        }
      }
    });

    this.http.get('http://localhost:8080/fleets').subscribe((data: any) => {
      this.listFleets = data;
      console.log('Liste fleets :', this.listFleets);
    });
  }

  filterModels(): void {
    this.listModelFiltered = [];
    for (let model of this.listModel) {
      if (model.brand == this.brand) {
        this.listModelFiltered.push(model);
      }
    }
    this.vehicleModelName = '';
    this.vehicle = {};
    console.log(this.listModelFiltered);
  }

  viewModel(): void {
    //.find renvoie le premier élément correspondant à la condition donnée dans la fonction
    this.vehicle = this.listModel.find(
      (vehicle: any) => vehicle.modelName == this.vehicleModelName
    );
    console.log(this.vehicle);
  }

  addVehicleSubmit(): void {
    console.log('Véhicule à envoyer');
    console.log(this.vehicle);
    const vehicleToRegister: VehicleToRegister = new VehicleToRegister(
      this.licencePlate,
      this.vehicle.id,
      parseInt(this.userService.getUserFleetId())
    );

    console.log(vehicleToRegister);

    this.vehicleService.addVehicle(vehicleToRegister).subscribe((response) => {
      if (this.vehicle != null) {
        console.log(response);
        console.log('Véhicule ajouté avec succès !');
      } else {
        console.log("Erreur lors de l'ajout du véhicule");
      }
    });
  }
}

class VehicleToRegister {
  licencePlate: string;
  model: any;
  fleet: any;

  constructor(licencePlate: string, model_id: number, fleet_id: number) {
    this.licencePlate = licencePlate;
    this.model = { id: model_id};
    this.fleet = { id: fleet_id};
  }
}
