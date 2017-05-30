import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  heroForm: FormGroup;
  messages = [];
  validationMessages = {
    'name': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 4 characters long.',
      'maxlength': 'Name cannot be more than 24 characters long.'
    },
    'message': {
      'required': 'Message cannot be blank.',
      'minlength': 'Message is too short, minimum is 50 characters',
      'maxlength': 'Message is too long, maximum is 1000 characters'
    }

  };

  constructor(private fb: FormBuilder) { // <--- inject FormBuilder
    this.createForm();
  }

  ngOnInit() {
  }

  onSubmit({ value, valid }): void {
    this.messages.push(value);
  }

  onPatch() {
    this.heroForm.patchValue({ name: 'foo' });
  }

  get validationErrors() {
    const errors = {};
    // const controlKeys
    Object.keys(this.heroForm.controls).forEach(key => {
      errors[key] = '';
      const control = this.heroForm.controls[key];
      if (control && !control.valid) {
        const messages = this.validationMessages[key];
        Object.keys(control.errors).forEach(error => {
          errors[key] += messages[error] + ' ';
        });
      }
    });
    return errors;
  }

  createForm() {
    this.heroForm = this.fb.group({
      name: ['',
        [Validators.required,
        Validators.minLength(4),
        Validators.maxLength(24)]
      ],
      message: ['',
        [Validators.required,
        Validators.minLength(50),
        Validators.maxLength(1000)]
      ],
    });
  }

  // title = 'app works!';
  // model = {
  //   name: 'foo',
  //   alterEgo: 'bar',
  //   power: 'Super Hot'
  // };
  // powers = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer'];
  // onSubmit() {
  //   console.log(this.model);
  // }
}
