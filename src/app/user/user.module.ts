import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AdminInterfaceComponent } from './admin-interface/admin-interface.component';
import { RouterModule, Routes } from '@angular/router';

const userRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  declarations: [
    LoginComponent,
    AdminInterfaceComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(userRoutes)
  ],
})
export class UserModule {}
