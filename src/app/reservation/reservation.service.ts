import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
      return this.http.get("http://localhost:8080/reservations" + endpoint);
    }
    return this.http.get("http://localhost:8080/reservations" + endpoint);
  }

  postNewReservation(data: any) {
    return this.http.post("http://localhost:8080/reservations/add", data);
  }

  setResaStatus(reservation: any): string {
    const checkFinished = new Date(reservation.end_Date) < this.today;
    const checkToCome = new Date(reservation.start_Date) > this.today;
    if (checkFinished) {
      return "terminée";
    }
    if (checkToCome) {
      return "à venir";
    }
    return "en cours";
  }

  private formatDate(nmbr: number): string {
    var date = nmbr + '';
    date = date.length < 2 ? '0' + date : date;
    return date;
  }
  
  dateToString(date: Date): string {
    return date.getFullYear() + '-' + this.formatDate(date.getMonth() + 1) + '-' + this.formatDate(date.getDate()) + 'T00:00';
  }

  setupMaxDate(date: Date): string {
    const maxDate = date;
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    return this.dateToString(maxDate);
  }
}

