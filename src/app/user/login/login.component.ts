import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { UserService } from '../user.service'; // Importez NgModel ici

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  CP: string = '';
  password: string = '';
  memoriserMotDePasse: boolean = false;

  isCPValid: boolean | '' = false;
  formSubmitted = false;

  showSuccessMessage = false;
  formSubmissionTime = 0;

  constructor(private userService: UserService) {}

  checkPseudoValidity() {
    this.isCPValid = this.CP && this.CP.length >= 3 && this.CP.length <= 20;
  }

  onSubmit() {
    // Affichez les données du formulaire dans la console à des fins de débogage

    // Appeler la méthode Login qui est dans UserService (Faire l'importe UserService avant et CREER le consctructor pour l'injecter)
    // Appelez la méthode login du service UserService en passant les données du formulaire
    this.userService.login(this.CP, this.password).subscribe(
      (response) => {
        // Traitez ici la réponse du service (par exemple, gérer la connexion réussie)
        console.log('Réponse du service après la connexion:', response);
      },

      (error) => {
        // Gérez les erreurs ici (par exemple, affichez un message d'erreur à l'utilisateur)
        console.error('Erreur lors de la connexion:', error);
      }
    );

    console.log('Identifiant:', this.CP);
    console.log('Mot de passe:', this.password);
    console.log('Mémoriser le mot de passe:', this.memoriserMotDePasse);

    // Vous pouvez maintenant soumettre ces données au service ou effectuer d'autres opérations
  } // ou true si vous voulez que la case soit coch ée par défaut
}
