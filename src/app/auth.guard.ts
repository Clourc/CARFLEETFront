import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthentificationService } from './authentification.service';

export const userGuard: CanActivateFn = () => {
  const authService = inject(AuthentificationService);
  const router = inject(Router);

  if (authService.isTokenValid()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthentificationService);
  const router = inject(Router);

  if (authService.isTokenValid()) {
    if (localStorage.getItem('role') == 'ADMIN') {
      return true;
    }
    router.navigate(['/vehicles']);
    return false;
  }
  router.navigate(['/login']);
  return false;
};
