import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './misc/header/header.component';
import { VehicleSearchComponent } from './vehicle/vehicle-search/vehicle-search.component';
import { FooterComponent } from './misc/footer/footer.component';
import { FormControl, FormGroup } from '@angular/forms';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { VehicleListComponent } from './vehicle/vehicle-list/vehicle-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CARFLEETFront';

  constructor(private userService: UserService){}

  ngOnInit(): void {
      let tokenData = localStorage.getItem('token')?.split('.')[1];
      let decodedData = '';
      let userCP = '';
      if(tokenData){
        decodedData = atob(tokenData);
        userCP = JSON.parse(decodedData).sub;
        this.userService.retrieveUser(userCP).subscribe((data: any) => {
          this.userService.setUser(data);
          this.userService.setUserId();

          console.log(this.userService.getUserRole());
        });
      }
  }
}
