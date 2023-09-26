import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent {

  searchForm: FormGroup

  formSubmitted: boolean = false;

  constructor(


  ) {
    this.searchForm = new FormGroup(
      {
        firstname: new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        message: new FormControl('', [Validators.required])
      },

    );
  }


  onSubmit() {
    this.formSubmitted = true;

    const firstname = this.searchForm.get('firstname')?.value;
    const lastname = this.searchForm.get('lastname')?.value;
    const email = this.searchForm.get('email')?.value;
    const message = this.searchForm.get('message')?.value;

    if (this.searchForm.invalid) {
      return;
    }

    if (!firstname && !lastname && !email && !message) {
      this.searchForm.get('firstname')?.setErrors({ required: true });
    }

  }
}


