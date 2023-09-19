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
    return this.http.get<any[]>(this.apiUrl + '?fleetId=' + this.userService.getUserFleetId());
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
console.log("resrvationList", reservationList);
      for (let i = 0; i < reservationList.length; i++) {
        // if (reservationList[i].vehicle.model.modelName === "CLIO RS Line"
        // || reservationList[i].vehicle.model.modelName === 
        // "ZOE R110") {
        //   console.log("vehicle reservation", reservationList[i])
        //   let checkResaStartDatesTest: boolean =
        //   reservationStart >= reservationList[i].start_Date &&
        //   reservationStart <= reservationList[i].end_Date;

        //   console.log("checktest startDate", checkResaStartDatesTest)
        // }
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
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const deleteUrl = `${this.apiUrl}/${id}/delete`;
    console.log("&&&&&&&&&&&&&&&&&&&&&& deleteUrl", deleteUrl)
    return this.http.delete(deleteUrl, httpOptions);
  }
}

      if (filterResult.length == 0) {
        vehiclesToDisplay = savedVehicles;
      } else {
        // Ici je crée un tableau de vehicleId parce que c'est le tableau de tous les véhicules
        // Je vais conserver l'id pour le filtre et l'index pour pouvoir récupérer le véhicule entier plus tard
        const savedVehiclesIds = savedVehicles.map((vehicle, idx) => {
         return  {vehicleId: vehicle.id, idx}
        });

        // Ici j'ai le tableau d'id des véhicule que je ne veux pas parce q'uils sont déjà réserver 
        const filterResultIds = filterResult.map(vehicle => vehicle.id);

        savedVehiclesIds.forEach((vehicleWithIdAndIndex: any) => {
         
          if (!filterResultIds.includes(vehicleWithIdAndIndex.vehicleId)) vehiclesToDisplay.push(savedVehicles[vehicleWithIdAndIndex.idx])
        })
        // console.log('Filter result :', filterResult);
        // for (let vehicle of savedVehicles) {
        //   // Liste de tous les véhicule
        //   if (filterResult.length > 0) {
        //     // filterResult est la liste des véhicule réservé dans les dates choisies
        //     for (let hideVehicle of filterResult) {
        //       const testVehicleFilter = (element: any) =>
        //         element.id == vehicle.id;
        //       if (
        //         hideVehicle.id != vehicle.id &&
        //         !vehiclesToDisplay.some(testVehicleFilter)
        //       ) {
        //         // On check si le véhicule de la liste de tous les véhicule
        //         // n'est pas dans la liste des véhicule réservé pour l'afficher
        //         vehiclesToDisplay.push(vehicle);
        //       }
        //     }
        //   }
        // }
      }
      // return la liste de véhicule disponible par date
    });
  }
}
