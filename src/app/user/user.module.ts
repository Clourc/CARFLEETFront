import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AdminInterfaceComponent } from './admin-interface/admin-interface.component';



@NgModule({
  declarations: [
    LoginComponent,
    AdminInterfaceComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
