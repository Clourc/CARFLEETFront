import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleCardComponent } from './vehicle-card/vehicle-card.component';
import { VehicleAddComponent } from './vehicle-add/vehicle-add.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { VehicleSearchComponent } from './vehicle-search/vehicle-search.component';
import { authGuard } from '../auth.guard';

const vehicleRoutes: Routes = [
  {
    path: 'vehicles',
    component: VehicleListComponent,
    canActivate: [authGuard],
  },
  { path: 'vehicles/search', component: VehicleSearchComponent },
  { path: 'admin/vehicles/add', component: VehicleAddComponent },
  { path: 'vehicles/:id', component: VehicleDetailsComponent },
];

@NgModule({
  declarations: [
    VehicleListComponent,
    VehicleCardComponent,
    VehicleAddComponent,
    VehicleDetailsComponent,
    VehicleSearchComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(vehicleRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class VehicleModule {}
