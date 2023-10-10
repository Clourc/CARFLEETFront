import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteSuccessDialogComponent } from 'src/app/delete-success-dialog/delete-success-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.css'],
})
export class VehicleAddComponent implements OnInit {
  brand: string = '';
  modelId: number = 0;
  vehicle: any = {};
  fleetId: number = 0;
  licencePlate: string = '';
  vehicleModelName: string = '';

  constructor(
    private vehicleService: VehicleService,
    private userService: UserService,
    private http: HttpClient,
    private dialog: MatDialog,
    private router : Router

  ) {}

  listModel: any = [];
  listBrands: string[] = [];
  listModelFiltered: any[] = [];
  listFleets: any[] = [];

  modelIdView: any;

  ngOnInit(): void {
    this.http.get('http://localhost:8080/models').subscribe((data: any) => {
      this.listModel = data;
      for (let model of this.listModel) {
        if (!this.listBrands.includes(model.brand)) {
          this.listBrands.push(model.brand);
        }
      }
    });

    this.http.get('http://localhost:8080/fleets').subscribe((data: any) => {
      this.listFleets = data;
    });
  }

  filterModels(): void {
    this.vehicleModelName = '';
    this.vehicle = {};
    this.listModelFiltered = [];
    for (let model of this.listModel) {
      if (model.brand == this.brand) {
        this.listModelFiltered.push(model);
      }
    }
  }

  viewModel(): void {
    this.vehicle = this.listModel.find(
      (vehicle: any) => vehicle.modelName == this.vehicleModelName
    );
  }

  addVehicleSubmit(): void {
    const vehicleToRegister: VehicleToRegister = new VehicleToRegister(
      this.licencePlate,
      this.vehicle.id,
      parseInt(this.userService.getUserFleetId())
    );

    this.vehicleService.addVehicle(vehicleToRegister).subscribe(() => {
      if (this.vehicle != null) {
        this.openSuccessDialog('Véhicule ajouté avec succès !');
        this.router.navigate(['/admin']);
      } else {
        console.log("Erreur lors de l'ajout du véhicule");
      }
    });
  }
  openSuccessDialog(message: string): void {
    const dialogRef = this.dialog.open(DeleteSuccessDialogComponent, {
      width: '300px',
      data: { message: message }
    });
  
    dialogRef.afterClosed().subscribe(() => {
    });
  }
}

class VehicleToRegister {
  licencePlate: string;
  model: any;
  fleet: any;

  constructor(licencePlate: string, model_id: number, fleet_id: number) {
    this.licencePlate = licencePlate;
    this.model = { id: model_id};
    this.fleet = { id: fleet_id};
  }
}
