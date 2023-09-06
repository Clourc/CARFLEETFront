import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleCardComponent } from './vehicle-card/vehicle-card.component';
import { VehicleAddComponent } from './vehicle-add/vehicle-add.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { VehicleSearchComponent } from './vehicle-search/vehicle-search.component';
import { RouterModule, Routes } from '@angular/router';

const vehicleRoutes: Routes = [
  { path: 'vehicles/:id', component: VehicleDetailsComponent}
]

@NgModule({
  declarations: [
    VehicleListComponent,
    VehicleCardComponent,
    VehicleAddComponent,
    VehicleDetailsComponent,
    VehicleSearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(vehicleRoutes)
  ]
})
export class VehicleModule { }
