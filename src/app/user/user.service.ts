import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // login(email: string, password: string) {
  //   return this.http.post<any>(`http://localhost:8080/login`, { email, password })
  //     .pipe(tap((data: any) => {
  //     const response = data.data;
  //     console.log('@@@@@@@@@response:', response)

  //       if (response && response.token) {
  //         localStorage.setItem('token', response.token);
  //       }
  //       return response;
  //     }));
  // };

  constructor(private http: HttpClient) {}

  login(CP: string, password: string) {
    return this.http
      .post<any>('http://localhost:8080/users/login', { CP, password })
      .pipe(
        tap((data: any) => {
          const response = data.data;
          console.log('@@@@@@@@response:', response);

          if (response && response.token) {
            localStorage.setItem('token', response.token);
          }
          return response;
        })
      );
  }
}
