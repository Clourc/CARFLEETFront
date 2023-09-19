import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ReservationService } from '../reservation/reservation.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private apiUrlAddVehicle = 'http://localhost:8080/vehicles/add';

  private apiUrl = 'http://localhost:8080/vehicles';

  constructor(
    private http: HttpClient,
    private reservationService: ReservationService,
    private userService: UserService
  ) {}

  getVehicles(): Observable<any[]> {
    return this.http.get<any[]>(
      this.apiUrl + '?fleetId=' + this.userService.getUserFleetId()
    );
  }

  getVehiclebyId(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/vehicles/${id}`);
  }

  addVehicle(vehicleData: any): Observable<any> {
    return this.http.post(`${this.apiUrlAddVehicle}`, vehicleData);
  }

  findVehicleByTypeAndEnergy(type: string, energy: string): Observable<any[]> {
    const url = `${this.apiUrl}?type=${type}&energy=${energy}`;
    return this.http.get<any[]>(url);
  }

  recherche(
    vehiclesToDisplay: any[],
    savedVehicles: any[],
    reservationStart: Date,
    reservationEnd: Date
  ) {
    let reservationList: any[] = [];
    this.reservationService.getListResa().subscribe((data: any) => {
      reservationList = data;

      const filterResult: any[] = [];
      console.log('resrvationList', reservationList);
      for (let i = 0; i < reservationList.length; i++) {
        let checkResaStartDates: boolean =
          reservationStart >= reservationList[i].start_Date &&
          reservationStart <= reservationList[i].end_Date;
        let checkResaEndDates: boolean =
          reservationEnd >= reservationList[i].start_Date &&
          reservationEnd <= reservationList[i].end_Date;
        let checkResaWide: boolean =
          reservationStart <= reservationList[i].start_Date &&
          reservationEnd >= reservationList[i].end_Date;
        if (checkResaStartDates || checkResaEndDates || checkResaWide) {
          filterResult.push(reservationList[i].vehicle);
        }
      }
      if (filterResult.length == 0) {
        vehiclesToDisplay = savedVehicles;
      } else {
        const savedVehiclesIds = savedVehicles.map((vehicle, idx) => {
          return { vehicleId: vehicle.id, idx };
        });

        const filterResultIds = filterResult.map((vehicle) => vehicle.id);

        savedVehiclesIds.forEach((vehicleWithIdAndIndex: any) => {
          if (!filterResultIds.includes(vehicleWithIdAndIndex.vehicleId))
            vehiclesToDisplay.push(savedVehicles[vehicleWithIdAndIndex.idx]);
        });
      }
    });
  }

  deleteVehicle(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    const deleteUrl = `${this.apiUrl}/${id}/delete`;
    console.log('&&&&&&&&&&&&&&&&&&&&&& deleteUrl', deleteUrl);
    return this.http.delete(deleteUrl, httpOptions);
  }
}
