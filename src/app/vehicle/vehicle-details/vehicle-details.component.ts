import { HttpClient } from '@angular/common/http';
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
  isAdmin: boolean = false;


  constructor(
    private http: HttpClient,
    private router: Router,
    private vehicleService: VehicleService,
    private userService : UserService
 
  ) {}

  ngOnInit(): void {
    this.vehicleId = this.router.url.split('/').pop();
    console.log('Url: ' + this.router.url);
    console.log('Vehicle Id: ' + this.vehicleId);
    this.http.get('http://localhost:8080/vehicles/' + this.vehicleId).subscribe((data) => {
      console.log(data);
      this.vehicleDetails = data;
      this.vehicleDetails.model.brand = this.vehicleDetails.model.brand.toUpperCase();
    }); 
    const userRole = this.userService.getUser();
console.log(userRole)
    this.isAdmin = userRole === 'ADMIN';
  
  }

  confirmDelete(vehicleId: number) {
    const result = window.confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?');

    if (result) {
      this.deleteVehicle(vehicleId);
    }
  }


  deleteVehicle(vehicleId: number) {
    this.vehicleService.deleteVehicle(vehicleId).subscribe(
      (response: any) => {
        if (response.success) {
          console.log('Véhicule supprimé avec succès !', response.message);
          
        } else {
          console.error('Erreur lors de la suppression du véhicule:', response.message);
      
        }
      },
      (error) => {
        console.error('Erreur lors de la suppression du véhicule:', error);
     
      }
    );
  }
  


  
  
}
