import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { FormService } from './form.service'
import { AppService } from '../app.service'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  providers: [
    FormService
  ]
})
export class FormComponent {
  postForm: FormGroup
  validationMessages = {
    'title': {
      'required': 'Title is required.',
      'minlength': 'Title must be at least 4 characters long.',
      'maxlength': 'Title cannot be more than 24 characters long.'
    },
    'message': {
      'required': 'Message cannot be blank.',
      'minlength': 'Message is too short, minimum is 50 characters',
      'maxlength': 'Message is too long, maximum is 1000 characters'
    }
  }

  constructor(
    private router: Router,
    private formService: FormService,
    public appService: AppService,
    private fb: FormBuilder,
  ) {
    this.createForm()
  }

  get validationErrors() {
    const errors = {}
    Object.keys(this.postForm.controls).forEach(key => {
      errors[key] = ''
      const control = this.postForm.controls[key]
      if (control && !control.valid) {
        const messages = this.validationMessages[key]
        Object.keys(control.errors).forEach(error => {
          errors[key] += messages[error] + ' '
        })
      }
    })
    return errors
  }

  createForm() {
    this.postForm = this.fb.group({
      title: ['',
        [Validators.required,
        Validators.minLength(4),
        Validators.maxLength(24)]
      ],
      message: ['',
        [Validators.required,
        Validators.minLength(50),
        Validators.maxLength(1000)]
      ],
    })
  }

  onSubmit({ value, valid }) {
    if (!valid) {
      return
    }
    this.formService.addPost(value)
  }

  onCancel() {
    this.router.navigate(['/posts'])
  }
}

