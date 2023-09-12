import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class VehicleService {

  private apiUrlAddVehicle = 'http://localhost:8080/vehicles/add';
 
private apiUrl = 'http://localhost:8080/vehicles';

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/vehicles');
  }

  getVehiclebyId(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/vehicles/${id}`);
  }
  findVehicleByTypeAndEnergy(type: string, energy: string): Observable<any[]> {
    const url = `${this.apiUrl}?type=${type}&energy=${energy}`;
    return this.http.get<any[]>(url);

}

}

  /*getVehicles() {
    fetch('http://localhost:8080/vehicules')
      .then(response => response.json())
      .then(data => {
        this.listVehicles = data;
        console.log(data);
      }
      )
      return this.listVehicles;
  }*/