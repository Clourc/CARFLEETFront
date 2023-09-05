import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  addVehicleSubmit(form: any) {
    throw new Error('Method not implemented.');
  }
  private apiUrlAddVehicle = 'http://localhost:8080/vehicles/add';


  constructor(private http: HttpClient) { }

  addVehicle(vehicleData: any): Observable<any> {
    return this.http.post(`${this.apiUrlAddVehicle}`, vehicleData);
  }

  catalogueBrand = [
    "renault",
    "citroen",
    "peugeot"
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
