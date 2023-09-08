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

  userId: number = this.userService.getUserId();
  reservationList: any[] = [];

  ngOnInit(): void {
      this.http.get(`http://localhost:8080/reservations?userId=${this.userId}`).subscribe((data: any) => {
        this.reservationList = data;
        console.log(this.reservationList);
      })
  }
}
