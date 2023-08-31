import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit{

  constructor(public vehiculeService: VehicleService) { }

  ngOnInit(): void {
  }

listVehicules:any[]=[];

  trouvervehicule(form:any){
    console.log(form.value);
    //this.vehiculeService.getVehicles();
    fetch('http://localhost:8080/vehicules')
      .then(response => response.json())
      .then(data => {
        this.listVehicules = data;
        console.log(data);
      }
      )
  }

}
