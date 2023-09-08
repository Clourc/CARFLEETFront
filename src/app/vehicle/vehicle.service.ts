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
}

