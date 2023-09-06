import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
 

  constructor(private http : HttpClient) { }

getVehicles() :Observable<any[]>{
  return this.http.get<any[]>('http://localhost:8080/vehicles');
}
  getVehiclebyId(id:number):Observable<any>{
    return this.http.get<any>(`http://localhost:8080/vehicles/${id}`);
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