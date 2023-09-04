import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VehicleModule } from './vehicle/vehicle.module';
import { ReservationModule } from './reservation/reservation.module';
import { MiscModule } from './misc/misc.module';
import { UserModule } from './user/user.module'; // Assurez-vous d'importer UserModule si vous ne l'avez pas déjà fait

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    VehicleModule,
    ReservationModule,
    MiscModule,
    UserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
