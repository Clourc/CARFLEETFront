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
  private currentUserId: any;

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
            this.currentUserId = this.getUserId();
            this.router.navigate(['/vehicles']);
          }
          return response;
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  retrieveUser(CP: string) {
    return this.http.get('http://localhost:8080/users/retrieve?cp=' + CP);
  }

  getUserId(): number {
    return this.currentUserId;
  }

  getUser(): any {
    return this.currentUser;
  }

  setUser(user: any): void {
    this.currentUser = user;
  }

  setUserId(): void {
    this.currentUserId = this.currentUser.id;
  }
}
