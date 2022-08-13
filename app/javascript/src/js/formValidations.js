/* eslint-disable */

import { Application } from "stimulus";
import { ValidationController } from "stimulus-validation"
// https://github.com/jwald1/stimulus-validation

export default class SignupValidation extends ValidationController {
  static rules = {
    email: { presence: { allowEmpty: false }, email: true},
    username: { presence: { allowEmpty: false } },
    password: { presence: { allowEmpty: false }, length: {minimum: 6, maximum: 128 } }
  }

  static validators = { passwordIsConfirmed: { attributes: ['password_confirmation' ]  } }

  passwordIsConfirmed({attr, value}) {
    if (value !== document.getElementById('user_password').value) {
	    this.errors.add(attr, 'Passwords do not match')
    }
  }

  afterValidate({ el, attr }) {
    console.log('yo')
    this.errorMessageEl(el).textContent = this.errorMessage(attr)
  }

  errorMessageEl(el) {
    return el.closest(".form-field").querySelector(".form__error-message")
  }

  errorMessage(attr) {
    return this.errors.has(attr) ? this.errors.get(attr)[0] : ""
  }
}

const application = Application.start();
application.register('signup-validation', SignupValidation)
