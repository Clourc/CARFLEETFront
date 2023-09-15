import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleService } from '../vehicle.service';
import { UserService } from 'src/app/user/user.service';

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
    private vehicleService: VehicleService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.vehicleId = this.router.url.split('/').pop();
    console.log('Url: ' + this.router.url);
    console.log('Vehicle Id: ' + this.vehicleId);
    this.http
      .get('http://localhost:8080/vehicles/' + this.vehicleId, {
        responseType: 'json', // Indiquer que nous attendons une réponse JSON.
      })
      .subscribe((data: any) => {
        console.log(data);
        this.vehicleDetails = data;
        this.vehicleDetails.model.brand =
          this.vehicleDetails.model.brand.toUpperCase();
      });

    const userRole = this.userService.getUser();
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
    const result = window.confirm(
      'Êtes-vous sûr de vouloir supprimer ce véhicule ?'
    );

    if (result) {
      this.deleteVehicle(vehicleId);
    }
  }


  deleteVehicle(vehicleId: number) {

    console.log('Tessssssst deletee');
    return this.vehicleService.deleteVehicle(vehicleId).subscribe({
      next: (data) => {
        console.log('data sucessss', data);
        this.router.navigate(["/vehicles"])
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }
}
