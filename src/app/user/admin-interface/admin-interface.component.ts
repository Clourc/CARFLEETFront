import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-interface',
  templateUrl: './admin-interface.component.html',
  styleUrls: ['./admin-interface.component.css'],
})
export class AdminInterfaceComponent implements OnInit {
  constructor(private http: HttpClient, private userService: UserService) {}

  reservationListAdmin: any = [];
  arraytoCome: any[] = [];
  arrayOngoing: any[] = [];

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    this.http
      .get(`http://localhost:8080/reservations?userId=${userId}`)
      .subscribe((data: any) => {
        this.reservationListAdmin = data;
        this.filterReservationByDate();
      });
  }

  filterReservationByDate() {
    const currentDate = new Date();
    this.reservationListAdmin.forEach((reservation: any) => {
      const startDate = new Date(reservation.start_Date);
      const endDate = new Date(reservation.end_Date);

      if (startDate > currentDate) {
        this.arraytoCome.push(reservation);
      } else if (endDate > currentDate) {
        this.arrayOngoing.push(reservation);
      }
    });
  }
}
