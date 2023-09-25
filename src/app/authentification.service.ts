import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  isTokenValid(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true; 
    } else {
      return false;
    }
  }

  constructor() {}

}
