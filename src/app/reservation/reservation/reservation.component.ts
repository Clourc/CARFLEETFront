import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { DeleteSuccessDialogComponent } from 'src/app/delete-success-dialog/delete-success-dialog.component';

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
    private route: ActivatedRoute,
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.vehicleId = params['id']));
  }

  private formatDate(nmbr: number): string {
    var date = nmbr + '';
    date = date.length < 2 ? '0' + date : date;
    return date;
  }

  openDialog(message: string): void {

    const dialogRef = this.dialog.open(DeleteSuccessDialogComponent, {
      data: { message: message },
    });

  };

  submitReservation() {
    console.log('Vehicle id: ', this.vehicleId);
    if (this.start_Date > this.end_Date) {
      this.openDialog("La date de début de réservation doit être avant celle de fin");
      throw new Error(
        'La date de début de réservation doit être avant celle de fin'
      );

    }
    this.reservationService.getListResa(undefined, this.vehicleId).subscribe((data) => {
      this.listResa = data;
      console.log('Liste réservation');
      console.log(this.listResa);
      //Vérification que le véhicule sélectionné ne soit pas déjà réservé pendant la période demandée
      for (let r of this.listResa) {
        let checkResaStartDates: boolean =
          this.start_Date >= r.start_Date && this.start_Date <= r.end_Date;
        let checkResaEndDates: boolean =
          this.end_Date >= r.start_Date && this.end_Date <= r.end_Date;
        let checkResaWide: boolean =
          this.start_Date <= r.start_Date && this.end_Date >= r.end_Date;
        if (checkResaStartDates || checkResaEndDates || checkResaWide) {
          console.log("vehicle unavailable");
          this.openDialog("véhicule indisponible");

          throw new Error(
            'Le véhicule est déjà réservé pour cette période, veuillez choisir un autre véhicule ou une autre période'
          );
        }
      }

      const reservationData = new ReservationData(
        this.start_Date,
        this.end_Date,
        this.reasonReservation,
        this.vehicleId,
        this.userService.getUserId()
      );

      console.log('Données résa: ' + reservationData);
      this.reservationService
        .postNewReservation(reservationData)
        .subscribe((data: any) => {
          this.openDialog("Réservation enregistrée");
          console.log('Data on submit: ' + data);
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
  dialog: any;
  result: any;
  deleteResa: any;
  reservationService: any;

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

  confirmeResa(reservationData: object) {
    console.log('reservationData', reservationData);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Êtes-vous sûr de vouloir supprimer cette réservation ?' },
    });

  }
  showDeleteSuccessDialog() {
  }

  validationResa(reservationData: object) {
    this.reservationService.deleteResa(reservationData).subscribe({
      next: (data: any) => {
        console.log('data success', data);
        this.showDeleteSuccessDialog();
      },
      error: (error: any) => {
        console.log('data error', error);
      },
    });
  }
}
