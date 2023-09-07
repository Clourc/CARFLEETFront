import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { HttpClient,HttpParams, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-vehicle-search',
  templateUrl: './vehicle-search.component.html',
  styleUrls: ['./vehicle-search.component.css']
})

export class VehicleSearchComponent {

  vehicles:any[]=[];
  searchForm:any=FormGroup ;
  maxShownVehicles:number=10;
  constructor(private httpClient:HttpClient , private fb: FormBuilder, private VehicleService: VehicleService) { 

  
    this.searchForm = this.fb.group({
      type: [''], // Correspond au champ de sélection de type de véhicule
      energy: [''] // Correspond au champ de sélection d'énergie
    });
  }

  onSubmit() {
    const type = this.searchForm.get('type').value;
    const energy = this.searchForm.get('energy').value;
console.log(type);
console.log(energy);
    const params = new HttpParams()
      .set('type', type)
      .set('energy', energy);

  this.VehicleService.findVehicleByTypeAndEnergy(type,energy).subscribe(
    (data:any) => {
      this.vehicles=data;
      console.log(data);

  
      });
    
}
}





