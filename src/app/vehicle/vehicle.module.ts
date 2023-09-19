import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleCardComponent } from './vehicle-card/vehicle-card.component';
import { VehicleAddComponent } from './vehicle-add/vehicle-add.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { VehicleSearchComponent } from './vehicle-search/vehicle-search.component';
import { userGuard, adminGuard } from '../auth.guard';
import { VehicleComponent } from './vehicle/vehicle.component';

const vehicleRoutes: Routes = [
  {
    path: 'vehicles',
    component: VehicleComponent,
    canActivate: [userGuard],
    children: [
      {
        path: '',
        canActivateChild: [userGuard],
        children: [
          { path: 'search', component: VehicleSearchComponent },
          { path: ':id', component: VehicleDetailsComponent },
          { path: '', component: VehicleListComponent },
        ],
      },
    ],
  },
  {
    path: 'admin/vehicles/add',
    component: VehicleAddComponent,
    canActivate: [adminGuard],
  },
];

@NgModule({
  declarations: [
    VehicleListComponent,
    VehicleCardComponent,
    VehicleAddComponent,
    VehicleDetailsComponent,
    VehicleSearchComponent,
    VehicleComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(vehicleRoutes),
  ],
})
export class VehicleModule {}
