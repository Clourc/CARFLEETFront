import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { ReservationService } from 'src/app/reservation/reservation.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
})
export class VehicleListComponent implements OnInit {
  vehiclesToDisplay: any[] = [];
  maxShownVehicles: number = 10;
  savedVehicles: any;
  reservationStart: Date | any;
  reservationEnd: Date | any;

  today: Date = new Date();
  todayString: string = this.reservationService.dateToString(this.today);
  maxDate: string = this.reservationService.setupMaxDate(this.today);
  formSubmitted: boolean = false;

  constructor(
    private vehicleService: VehicleService,
    private userService: UserService,
    private reservationService: ReservationService
  ) {}

  onSubmit() {
    this.vehiclesToDisplay = [];
    this.vehicleService.recherche(
      this.vehiclesToDisplay,
      this.savedVehicles,
      this.reservationStart,
      this.reservationEnd
    );
  }

  ngOnInit(): void {
    setTimeout(() => {
      const fleetId = this.userService.getUserFleetId();
      this.vehicleService.getVehicles(fleetId).subscribe((data) => {
        this.savedVehicles = data;
        this.vehiclesToDisplay = data;
      });
    }, 250);
     this.formSubmitted = true;
  }
}
