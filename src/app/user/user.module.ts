import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { AdminInterfaceComponent } from './admin-interface/admin-interface.component';



@NgModule({
  declarations: [
    LoginComponent,
    AccountComponent,
    AdminInterfaceComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
