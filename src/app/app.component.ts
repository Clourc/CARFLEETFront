import { Component, OnInit } from '@angular/core';
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
        });
      }
  }
}
