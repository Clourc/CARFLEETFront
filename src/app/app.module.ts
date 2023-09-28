import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { MiscModule } from './misc/misc.module';
import { UserModule } from './user/user.module';
import { ReservationModule } from './reservation/reservation.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { HeaderInterceptor } from './header.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DeleteSuccessDialogComponent } from './delete-success-dialog/delete-success-dialog.component';


@NgModule({
  declarations: [AppComponent, ConfirmDialogComponent, DeleteSuccessDialogComponent],
  imports: [
    CommonModule,
    BrowserModule,
    VehicleModule,
    ReservationModule,
    MiscModule,
    UserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,



  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
