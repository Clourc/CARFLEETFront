import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css'],
})
export class VehicleDetailsComponent implements OnInit {
  vehicleId!: string | undefined;
  vehicleDetails: any; 

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.vehicleId = this.router.url.split('/').pop();
    console.log('Url: ' + this.router.url);
    console.log('Vehicle Id: ' + this.vehicleId);
    this.http
      .get('http://localhost:8080/vehicles/' + this.vehicleId)
      .subscribe((data) => {
        console.log(data);
        this.vehicleDetails = data;
        this.vehicleDetails.brand = this.vehicleDetails.brand.toUpperCase();
      });
  }
}
