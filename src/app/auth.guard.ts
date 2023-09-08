import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthentificationService } from './authentification.service'; // Assurez-vous d'importer le service d'authentification approprié ici

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthentificationService);
  const router = inject(Router);

  if (authService.isTokenValid()) {
    return true; // L'utilisateur a un token, il est autorisé à accéder à la route
  } else {
    // L'utilisateur n'a pas de token, redirigez-le vers la page de connexion
    router.navigate(['/login']);
    return false;
  }
};
