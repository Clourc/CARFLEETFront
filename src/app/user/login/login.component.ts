import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  CP: string = '';
  password: string = '';
  afficherMotDePasse: boolean = false;
  

  passwordType: string = 'password';

  isCPValid: boolean | '' = false;
  formSubmitted = false;

  showSuccessMessage = false;
  formSubmissionTime = 0;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.userService.logout();
    }
  }

  updatePasswordVisibility(): void {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
    } else {
      this.passwordType = 'password';
    }
    // this.passwordType = this.afficherMotDePasse ? 'password' : 'text';
    console.log('sdsdsdsdsdsdsd');
  }

  checkPseudoValidity() {
    this.isCPValid = this.CP && this.CP.length >= 3 && this.CP.length <= 20;
  }

  onSubmit() {
    this.userService.login(this.CP, this.password).subscribe((response) => {
      console.log('Réponse du service après la connexion:', response);
    });
  }
}
