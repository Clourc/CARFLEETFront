import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  today = new Date();
  reservation: any = {};

  constructor(private http: HttpClient, private userService: UserService) { }

  getListResa(userId?: number, vehicleId?: string){
    if((!userId && !vehicleId) || (userId && vehicleId)){
      throw new Error("Only one of UserId or VehicleId required");
    }
    let endpoint = `?userId=${userId}`;
    if (vehicleId) {
      endpoint = `?vehicleId=${vehicleId}`;
      console.log("endpoint: " + endpoint);
      return this.http.get("http://localhost:8080/reservations" + endpoint);
    }
    console.log("endpoint: " + endpoint);
    return this.http.get("http://localhost:8080/reservations" + endpoint);
  }

  postNewReservation(data: any) {
    console.log("Posting new reservation");
    return this.http.post("http://localhost:8080/reservations/add", data)
      .pipe(tap((data: any) => {
        const response = data.data;
        console.log("response from API: " + response);
      }));
  }

  setResaStatus(reservation: any): string {
    const checkFinished = new Date(reservation.end_Date) < this.today;
    const checkToCome = new Date(reservation.start_Date) > this.today;
    console.log("today: " + this.today);
    console.log("Start date: " + new Date(reservation.start_Date));
    if (checkFinished) {
      return "terminée";
    }
    if (checkToCome) {
      return "à venir";
    }
    return "en cours";
  }
}

