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

addVehicle(vehicleData:any): Observable<any> {
  return this.http.post(`${this.apiUrlAddVehicle}`, vehicleData);
}
 
}



 