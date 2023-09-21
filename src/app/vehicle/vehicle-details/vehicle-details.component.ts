import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../vehicle.service';
import { UserService } from 'src/app/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { DeleteSuccessDialogComponent } from 'src/app/delete-success-dialog/delete-success-dialog.component';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css'],
})
export class VehicleDetailsComponent implements OnInit {
  vehicleId!: string | undefined;
  vehicleDetails: any;
  role: string | undefined;
  isAdmin: boolean = true;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.vehicleId = params['id']));
    console.log('Vehicle Id: ' + this.vehicleId);
    this.http
      .get('http://localhost:8080/vehicles/' + this.vehicleId, {
        responseType: 'json',
      })
      .subscribe((data: any) => {
        console.log(data);
        this.vehicleDetails = data;
        this.vehicleDetails.model.brand =
          this.vehicleDetails.model.brand.toUpperCase();
      });

    const userRole = this.userService.getUserRole();
    console.log(userRole);
    this.isAdmin = userRole === 'ADMIN';
  }

  refresh() {
    this.http
      .get('http://localhost:8080/vehicles/' + this.vehicleId, {
        responseType: 'json',
      })
      .subscribe((data: any) => {
        console.log(data);
        this.vehicleDetails = data;
        this.vehicleDetails.model.brand =
          this.vehicleDetails.model.brand.toUpperCase();
      });
  }

  confirmDelete(vehicleId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    
      data: { message: 'Êtes-vous sûr de vouloir supprimer ce véhicule ?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteVehicle(vehicleId); // Supprimer le véhicule si la réponse est "Oui"
      }
    });
  }
  showDeleteSuccessDialog() {
    const dialogRef = this.dialog.open(DeleteSuccessDialogComponent, {
   
      data: {
        message: 'La suppression du véhicule a été effectuée avec succès.',
      },
    });
  }

  deleteVehicle(vehicleId: number) {
    this.vehicleService.deleteVehicle(vehicleId).subscribe({
      next: (data) => {
        console.log('data success', data);
        this.showDeleteSuccessDialog();
        this.router.navigate(['/vehicles']);
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }
}
