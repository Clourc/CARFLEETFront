import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  private currentUser: any;

  login(CP: string, password: string) {
    return this.http
      .post<any>('http://localhost:8080/users/login', { CP, password })
      .pipe(
        tap((data: any) => {
          const response = data.data;
          console.log('@@@@@@@@response:', response);

          if (response && response.token) {
            localStorage.setItem('token', response.token);
            this.currentUser = response.user;
            this.router.navigate(['/vehicles']);
          }
          return response;
        })
      );
  }

  getUser(): string | undefined {
    if (this.currentUser) {
      return this.currentUser.role.type;
    }
    return undefined;
  }
  

  getUserId(): number{
    return this.currentUser.id;
  }

 

  
    
  }




