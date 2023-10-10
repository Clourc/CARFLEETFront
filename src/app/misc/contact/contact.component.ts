import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  searchForm: FormGroup;

  formSubmitted: boolean = false;

  constructor() {
    this.searchForm = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [Validators.required]),
    });
  }

  formTrySubmit(): void {
    this.formSubmitted = true;
  }

  onSubmit() {
    console.log(this.searchForm.value);
  }
}
