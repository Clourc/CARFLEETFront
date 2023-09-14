import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ReservationService } from '../reservation/reservation.service';


@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private apiUrlAddVehicle = 'http://localhost:8080/vehicles/add';



  private apiUrl='http://localhost:8080/vehicles'

  constructor(
    private http: HttpClient,
    private reservationService: ReservationService
  ) {}


  getVehicles(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/vehicles');
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
      console.log('test vide');
      console.log(vehiclesToDisplay);

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
          console.log('vehicle: ');
          filterResult.push(reservationList[i].vehicle);
          console.log('filter results', filterResult);
        }
      }
      savedVehicles.forEach((vehicle: any) => {
        // Liste de tous les véhicule
        if (filterResult.length > 0) {
          // filterResult est la liste des véhicule réservé dans les dates choisies
          for (let hideVehicle of filterResult) {
            if (hideVehicle.id != vehicle.id) {
              // On check si le véhicule de la liste de tous les véhicule
              // n'est pas dans la liste des véhicule réservé pour l'afficher
              console.log('Test');
              vehiclesToDisplay.push(vehicle);
            }
          }
        } else {
          // Si la liste de véhicule réservé est vide on affiche tous les véhicules
          // Parce qu'ils sont tous disponible
          vehiclesToDisplay = savedVehicles;
        }
      });
      console.log('display');
      console.log(vehiclesToDisplay);
    });
    // return la liste de véhicule disponible par date
  }

  deleteVehicle(id: number): Observable<any> {
    const deleteUrl = `${this.apiUrl}/${id}/delete`;
    return this.http.delete(deleteUrl);

}
}