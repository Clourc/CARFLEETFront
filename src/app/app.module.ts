import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { MiscModule } from './misc/misc.module';
import { UserModule } from './user/user.module';
import { ReservationModule } from './reservation/reservation.module';
import { VehicleModule } from './vehicle/vehicle.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    VehicleModule,
    ReservationModule,
    MiscModule,
    UserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
