import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  constructor(private http: HttpClient) {}

  login(CP: string, password: string) {
    return this.http
      .post<any>(`http://localhost:8080/users/login`, { CP, password })
      .pipe(
        tap((data: any) => {
          const response = data.data;
          console.log('@@@@@@@@@response:', response);

          if (response && response.token) {
            localStorage.setItem('token', response.token);
          }
          return response;
        })
      );
  }

  register({
    email,
    password,
    username,
  }: {
    email: string;
    password: string;
    username: string;
  }) {
    return this.http
      .post<any>(`http://localhost:8080/register`, {
        email,
        password,
        username,
      })
      .pipe(
        tap((data: any) => {
          const response = data.data;
          // login successful if there's a jwt token in the response
          if (response && response.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('token', response.token);
          }
          return data;
        })
      );
  }
}
