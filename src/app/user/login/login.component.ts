import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

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

  constructor(private userService: UserService, private router: Router) {}

  checkPseudoValidity() {
    this.isCPValid = this.CP && this.CP.length >= 3 && this.CP.length <= 20;
  }

  onSubmit() {
    this.userService.login(this.CP, this.password).subscribe((response) => {
      console.log('Réponse du service après la connexion:', response);
    });
  }
}
