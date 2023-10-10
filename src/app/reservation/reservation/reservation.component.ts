import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteSuccessDialogComponent } from 'src/app/delete-success-dialog/delete-success-dialog.component';
import { VehicleService } from 'src/app/vehicle/vehicle.service';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})

export class ReservationComponent implements OnInit {
  start_Date!: Date;
  end_Date!: Date;
  reasonReservation: string = '';
  vehicleId!: string | undefined;
  listResa: any = [];
  today: Date = new Date();
  todayString: string = this.reservationService.dateToString(this.today);
  maxDate: string = this.reservationService.setupMaxDate(this.today);

  constructor(
    private reservationService: ReservationService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private dialog: MatDialog,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.vehicleId = params['id']));
    this.start_Date = this.vehicleService.getReservationDates().startDate;
    this.end_Date = this.vehicleService.getReservationDates().endDate;
  }

  openDialog(message: string): void {
    const dialogRef = this.dialog.open(DeleteSuccessDialogComponent, {
      width: '300px',
      data: { message: message },
    });
    dialogRef.afterClosed().subscribe(() => {});
  }

  submitReservation() {
    let start_Date = new Date(this.start_Date);
    let end_Date = new Date(this.end_Date);
    if (start_Date > end_Date) {
      this.openDialog(
        'La date de début de réservation doit être avant celle de fin'
      );
      throw new Error(
        'La date de début de réservation doit être avant celle de fin'
      );
    }
    this.reservationService
      .getListResa(undefined, this.vehicleId)
      .subscribe((data) => {
        this.listResa = data;
        //Vérification que le véhicule sélectionné ne soit pas déjà réservé pendant la période demandée
        for (let r of this.listResa) {
          let checkResaStartDates: boolean =
            start_Date >= r.start_Date && start_Date <= r.end_Date;
          let checkResaEndDates: boolean =
            end_Date >= r.start_Date && end_Date <= r.end_Date;
          let checkResaWide: boolean =
            start_Date <= r.start_Date && end_Date >= r.end_Date;
          if (checkResaStartDates || checkResaEndDates || checkResaWide) {
            this.openDialog('Véhicule indisponible');

            throw new Error(
              'Le véhicule est déjà réservé pour cette période, veuillez choisir un autre véhicule ou une autre période'
            );
          }
        }
        const reservationData = new ReservationData(
          start_Date,
          end_Date,
          this.reasonReservation,
          this.vehicleId,
          this.userService.getUserId()
        );
        console.log('Données résa: ' + reservationData);
        this.reservationService
          .postNewReservation(reservationData)
          .subscribe((data: any) => {
            this.openDialog('Réservation enregistrée');
            this.router.navigate(['/reservations']);
          });
      });
  }
}

class ReservationData {
  start_Date: Date;
  end_Date: Date;
  reason: string;
  vehicle;
  user;

  constructor(
    start_Date: Date,
    end_Date: Date,
    reason: string,
    vehicle: string | undefined,
    userId: number
  ) {
    this.start_Date = start_Date;
    this.end_Date = end_Date;
    this.reason = reason;
    this.vehicle = { id: vehicle };
    this.user = { id: userId };
  }
}
