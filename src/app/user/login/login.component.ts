import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { UserService } from '../user.service'; // Importez NgModel ici

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  memoriserMotDePasse: boolean = false;

  constructor(private userService: UserService) {}

  onSubmit() {
    // Affichez les données du formulaire dans la console à des fins de débogage

    // Appeler la méthode Login qui est dans UserService (Faire l'importe UserService avant et CREER le consctructor pour l'injecter)
    // Appelez la méthode login du service UserService en passant les données du formulaire
    this.userService.login(this.email, this.password).subscribe(
      (response) => {
        // Traitez ici la réponse du service (par exemple, gérer la connexion réussie)
        console.log('Réponse du service après la connexion:', response);
      },

      (error) => {
        // Gérez les erreurs ici (par exemple, affichez un message d'erreur à l'utilisateur)
        console.error('Erreur lors de la connexion:', error);
      }
    );

    console.log('Identifiant:', this.email);
    console.log('Mot de passe:', this.password);
    console.log('Mémoriser le mot de passe:', this.memoriserMotDePasse);

    // Vous pouvez maintenant soumettre ces données au service ou effectuer d'autres opérations
  } // ou true si vous voulez que la case soit coch ée par défaut
}
