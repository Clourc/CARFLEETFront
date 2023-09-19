import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit{

  constructor(private http: HttpClient, private userService: UserService){}

  reservationList: any[] = [];


  ngOnInit(): void {
    setTimeout(() => {
      const userId = this.userService.getUserId();
      const userRole = this.userService.getUserRole();
      console.log("User role from service: " + userRole);
      this.http.get(`http://localhost:8080/reservations?userId=${userId}`).subscribe((data: any) => {
          this.reservationList = data;
          console.log(this.reservationList);
        })
    }, 250)
  }
}
