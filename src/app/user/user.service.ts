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

          if (response && response.token) {
            localStorage.setItem('token', response.token);
            this.currentUser = response.user;
            this.setUser(response.user);
            this.setUserId();
            this.saveUserData();
            this.router.navigate(['/vehicles']);
          }
          return response;
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser = null;
    this.currentUserId = null;
    this.deleteUserData();
  }

  retrieveUser(CP: string) {
    return this.http.get('http://localhost:8080/users/retrieve?cp=' + CP);
  }

  saveUserData(): void {
    localStorage.setItem('role', this.getUserRole());
    localStorage.setItem('userId', this.getUserId().toString());
  }

  deleteUserData(): void {
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
  }

  getUser(): string | undefined {
    return this.currentUser;
  }

  setUser(user: any): void {
    this.currentUser = user;
  }

  getUserId(): number {
    return this.currentUserId;
  }

  setUserId(): void {
    this.currentUserId = this.currentUser.id;
  }

  getUserRole(): string {
    return this.currentUser.role.type;
  }

  getUserFleetId(): string {
    return this.currentUser.fleet.id;
  }
}
