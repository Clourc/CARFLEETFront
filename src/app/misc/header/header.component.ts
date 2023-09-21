import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userRole: string | null = localStorage.getItem('role');

  constructor(private userService: UserService, private router: Router){}

  ngOnInit(): void {
      this.router.events.subscribe((val) => {
        if (val instanceof NavigationEnd){
          this.userRole = localStorage.getItem('role');
        }
      })
  }

  public logout(): any {
    return this.userService.logout();
  }
}

