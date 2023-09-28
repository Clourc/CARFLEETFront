import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  isTokenValid(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      let expDate: Date = new Date(
        JSON.parse(atob(token.split('.')[1])).exp * 1000
      );
      const today = new Date();
      if (expDate > today) {
        return true;
      }
    }
    return false;
  }

  constructor() {}
}
