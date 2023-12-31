import { Component } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';
import { ReservationService } from 'src/app/reservation/reservation.service';

@Component({
  selector: 'app-vehicle-search',
  templateUrl: './vehicle-search.component.html',
  styleUrls: ['./vehicle-search.component.css'],
})

export class VehicleSearchComponent {
  vehicles: any[] = [];
  searchForm: FormGroup;
  vehiclesToDisplay: any[] = [];
  formSubmitted: boolean = false;

  startDateForm: any;
  today: Date = new Date();
  todayString: string = this.reservationService.dateToString(this.today);
  maxDate: string = this.reservationService.setupMaxDate(this.today);

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private userService: UserService,
    private reservationService: ReservationService
  ) {
    this.searchForm = this.fb.group(
      {
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        type: [''],
        energy: [''],
      },
      {
        validator: this.validateSelects, // Utilisation du validateur personnalisé ici
      }
    );
  }

  // Fonction de validation personnalisée
  validateSelects(formGroup: FormGroup) {
    const type = formGroup.get('type')?.value;
    const energy = formGroup.get('energy')?.value;

    if (!type && !energy) {
      return { atLeastOneSelectRequired: true };
    }
    return null;
  }

  onSubmit() {
    this.vehiclesToDisplay = [];
    this.formSubmitted = true;

    const startDate = this.searchForm.get('startDate')?.value;
    const endDate = this.searchForm.get('endDate')?.value;
    const type = this.searchForm.get('type')?.value;
    const energy = this.searchForm.get('energy')?.value;

    if (!startDate || !endDate || this.searchForm.invalid) {
      if (!startDate) {
        this.searchForm.get('startDate')?.setErrors({ required: true });
      }
      if (!endDate) {
        this.searchForm.get('endDate')?.setErrors({ required: true });
      }
      return;
    }

    this.vehicleService
      .findVehicleByTypeAndEnergy(
        this.userService.getUserFleetId(),
        type,
        energy
      ).subscribe((data: any) => {
        this.vehicles = data;
        if (!startDate || !endDate) {
          this.vehiclesToDisplay = this.vehicles;
        } else {
          this.vehicleService.recherche(
            this.vehiclesToDisplay,
            this.vehicles,
            startDate,
            endDate
          );
        }
      });
  }
}
