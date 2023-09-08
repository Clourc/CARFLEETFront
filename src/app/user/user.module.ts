import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importez FormsModule ici

import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';

const userRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(userRoutes), // Assurez-vous que FormsModule est importé ici
  ],
})
export class UserModule {}
