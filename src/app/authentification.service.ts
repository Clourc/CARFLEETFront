import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  isTokenValid(): boolean {
    // throw new Error('Method not implemented.');
    const token = localStorage.getItem('token');

    // Vérifiez si le token existe et s'il n'est pas expiré (ajoutez votre logique ici)
    if (token) {
      // Vous pouvez ajouter une vérification de l'expiration du token ici
      // Si le token est valide, retournez true
      // Sinon, retournez false
      return true; // Par exemple, retournez true si le token existe, sinon retournez false
    } else {
      // Si le token n'existe pas, retournez false
      return false;
    }
  }
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

  getUserData() {
    return this.http
      .get<any>(`http://localhost:4200/vehicles`)
      .pipe((data: any) => {
        return data;
      });
  }
  // register({
  //   email,
  //   password,
  //   username,
  // }: {
  //   email: string;
  //   password: string;
  //   username: string;
  // }) {
  //   return this.http
  //     .post<any>(`http://localhost:8080/register`, {
  //       email,
  //       password,
  //       username,
  //     })
  //     .pipe(
  //       tap((data: any) => {
  //         const response = data.data;
  //         // login successful if there's a jwt token in the response
  //         if (response && response.token) {
  //           // store user details and jwt token in local storage to keep user logged in between page refreshes
  //           localStorage.setItem('token', response.token);
  //         }
  //         return data;
  //       })
  //     );
  // }

  onSignOut() {
    localStorage.removeItem('token');
  }
}
