import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthentificationService } from './authentification.service'; // Assurez-vous d'importer le service d'authentification approprié ici
import { UserService } from './user/user.service';

export const userGuard: CanActivateFn = () => {
  const authService = inject(AuthentificationService);
  const router = inject(Router);

  if (authService.isTokenValid()) {
    console.log('User access');
    return true; // L'utilisateur a un token, il est autorisé à accéder à la route
  } else {
    // L'utilisateur n'a pas de token, redirigez-le vers la page de connexion
    router.navigate(['/login']);
    return false;
  }
};

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthentificationService);
  const userService = inject(UserService);
  const router = inject(Router);

  console.log('Admin access ? Role :' + userService.getUserRole());

  if(authService.isTokenValid()){
    if(userService.getUserRole() == "ADMIN"){
      console.log('Admin access valid');
      return true
    }
    router.navigate(['/vehicles']);
    return false;
  }
  router.navigate(['/login']);
  return false;


}
