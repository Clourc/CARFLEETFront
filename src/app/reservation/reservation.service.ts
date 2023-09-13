import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }


  getListResa(vehicleId?: string){
    let endpoint = "";
    if(vehicleId){
      endpoint = `?vehiclesId=${vehicleId}`;
      console.log("endpoint: " + endpoint);
      return this.http.get("http://localhost:8080/reservations" + endpoint);
    }
    console.log("endpoint: " + endpoint);
    return this.http.get("http://localhost:8080/reservations");
  }

  postNewReservation(data: any){
    console.log("Posting new reservation");
    return this.http.post("http://localhost:8080/reservations/add", data)
    .pipe(tap((data: any) => {
      const response = data.data;
      console.log("response from API: " + response);
    }));
  }
}

