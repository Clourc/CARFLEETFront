import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthentificationService } from './authentification.service'; 
import { UserService } from './user/user.service';

export const userGuard: CanActivateFn = () => {
  const authService = inject(AuthentificationService);
  const router = inject(Router);

  if (authService.isTokenValid()) {
    console.log('User access');
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthentificationService);
  const router = inject(Router);

  console.log('Admin access ? Role :' + localStorage.getItem('role'));
  if(authService.isTokenValid()){
    if(localStorage.getItem('role') == "ADMIN"){
      console.log('Admin access valid');
      return true
    }
    router.navigate(['/vehicles']);
    return false;
  }
  router.navigate(['/login']);
  return false;
}
