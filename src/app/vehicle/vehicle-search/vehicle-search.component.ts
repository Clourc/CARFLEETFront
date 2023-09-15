import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-vehicle-search',
  templateUrl: './vehicle-search.component.html',
  styleUrls: ['./vehicle-search.component.css'],
})
export class VehicleSearchComponent {
  vehicles: any[] = [];
  searchForm: any = FormGroup;
  vehiclesToDisplay: any[] = [];
  constructor(
    private httpClient: HttpClient,
    private fb: FormBuilder,
    public vehicleService: VehicleService
  ) {
    this.searchForm = this.fb.group({
      startDate: [''],
      endDate: [''],
      type: [''], // Correspond au champ de sélection de type de véhicule
      energy: [''], // Correspond au champ de sélection d'énergie
    });
  }

  onSubmit() {
    // je vais faire appel à la méthode de mon service
    // pour avoir la liste de véhicule par date

    // Sur cette liste de véhicule je vais faire mùon filtre par type
    // Et par énergie
    this.vehiclesToDisplay = [];
    
    const startDate = this.searchForm.get('startDate').value;
    const endDate = this.searchForm.get('endDate').value;
    const type = this.searchForm.get('type').value;
    const energy = this.searchForm.get('energy').value;
    console.log(type);
    console.log(energy);
    if(type.length == 0 && energy.length == 0){
      throw new Error("Veuillez choisir un type et/ou une énergie pour le véhicule");
    }

    this.vehicleService
      .findVehicleByTypeAndEnergy(type, energy)
      .subscribe((data: any) => {
        this.vehicles = data;
        console.log(data);

        if(startDate.length == 0 || endDate.length == 0){
          this.vehiclesToDisplay = this.vehicles;
        } else {
          this.vehicleService.recherche(this.vehiclesToDisplay, this.vehicles, startDate, endDate);
        }
      });
  }
}
