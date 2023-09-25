import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from '../reservation.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { DeleteSuccessDialogComponent } from 'src/app/delete-success-dialog/delete-success-dialog.component';

@Component({
  selector: 'app-reservation-cancel',
  templateUrl: './reservation-cancel.component.html',
  styleUrls: ['./reservation-cancel.component.css'],
})
export class ReservationCancelComponent implements OnInit {
  reservationCancel: any = {};
  reservationId!: string | null;
  reservationStatus: string | undefined;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private dialog: MatDialog,
    private location: Location
  ) {}

  reservationList: any[] = [];

  ngOnInit(): void {
    this.reservationId = this.route.snapshot.paramMap.get('id');
    this.http
      .get('http://localhost:8080/reservations/' + this.reservationId)
      .subscribe((data) => {
        console.log(data);
        this.reservationCancel = data;

        this.reservationCancel.vehicle.model.brand =
          this.reservationCancel.vehicle.model.brand.toUpperCase();
        this.reservationStatus = this.reservationService.setResaStatus(
          this.reservationCancel
        );
      });
  }

  confirmDeleteResa() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Êtes-vous sûr de vouloir annuler cette réservation ?' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cancelConfirm();
      }
    });
  }

  cancelConfirm() {
    this.http
      .delete(`http://localhost:8080/reservations/${this.reservationId}/delete`)
      .subscribe((data) => {
        console.log(data);
        this.showDeleteSuccessDialog();
        this.location.historyGo(-2);
      });
  }

  showDeleteSuccessDialog() {
    const dialogRef = this.dialog.open(DeleteSuccessDialogComponent, {
      data: {
        message: 'Cette réservation a bien été annulée',
      },
    });
  }

}
