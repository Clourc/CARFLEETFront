import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent {
  vehicleDetails: FormGroup;

constructor(private fb: FormBuilder) {
  this.vehicleDetails = this.fb.group({
    vehicleModel: ['', Validators.required],
    vehicleImage: ['', Validators.required],
    vehicletype: ['', Validators.required],
    vehicleEnergy: ['', Validators.required],
    vehicleDoors: ['', Validators.required],
    vehicleSeats: ['', Validators.required],
    vehiclePlace: ['', Validators.required],
  });
}

onSubmit() {
  console.log(this.vehicleDetails.value);
}
}