import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './misc/header/header.component';
import { VehicleSearchComponent } from './vehicle/vehicle-search/vehicle-search.component';
import { FooterComponent } from './misc/footer/footer.component';
import { FormControl, FormGroup } from '@angular/forms';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { VehicleListComponent } from './vehicle/vehicle-list/vehicle-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CARFLEETFront';
}
