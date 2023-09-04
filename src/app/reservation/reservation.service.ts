import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  postNewReservation(data: any){
    return this.http.post("http://localhost:8080/reservations/add", data)
    .pipe(tap((data: any) => {
      const response = data.data;
      console.log("response from API: " + response);
    }));
  }
}
