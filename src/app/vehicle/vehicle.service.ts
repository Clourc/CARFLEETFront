import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class VehicleService {

  private apiUrlAddVehicle = 'http://localhost:8080/vehicles/add';

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/vehicles');
  }

  getVehiclebyId(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/vehicles/${id}`);
  }

  addVehicle(vehicleData: any): Observable<any> {
    return this.http.post(`${this.apiUrlAddVehicle}`, vehicleData);
  }

  catalogueBrands = [
    "renault",
    "citroen",
    "peugeot"
  ];

  catalogueModels = [ //catalogueModel aurait du etre un grand objet avec les cles renault,citroen,peugeot
    {
      renault: [
        { modelName: "ZOE R110", id: 1 },
        { modelName: "CLIO RS Line", id: 2 },
        { modelName: "KANGOO 3", id: 3 },
        { modelName: "MEGANE 3 phase 3", id: 4 },
        { modelName: "TRAFIC Grand confort", id: 7 },
      ]
    },
    {
      citroen: [
        { modelName: "e BERLINGO shine", id: 5 },
      ]
    },
    {
      peugeot: [
        { modelName: "BOXER Asphalt 333", id: 6 },
      ]
    },
  ];

  catalogueFleets = [

    { fleetName: "strasbourg", id: 1 },
    { fleetName: "paris", id: 2 },
    { fleetName: "lyon", id: 3 },
    { fleetName: "marseille", id: 4 },
  ]

  catalogueVehicle = [
    new vehicleAdd("renault", 1),
    new vehicleAdd("renault", 2),
    new vehicleAdd("renault", 3),
    new vehicleAdd("renault", 4),
    new vehicleAdd("citroen", 5),
    new vehicleAdd("peugeot", 6),
    new vehicleAdd("renault", 7),

  ]

}

class vehicleAdd {
  brand: string;
  licencePlate: string;
  model;
  fleet;

  constructor(brand: string, model_id: number) {
    this.brand = brand;
    this.licencePlate = '';
    this.model = { id: model_id };
    this.fleet = { id: 0 };
  }

}

