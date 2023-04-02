import { Injectable } from "@angular/core";
import { Validators } from "@angular/forms";
import { FormControl, FormGroup } from "@angular/forms";
import { RegistrationRequest } from "src/models";

export class RegisterFormModel {
  form: FormGroup;
  
  constructor() {
    this.form = new FormGroup({
      "inputEmail": new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      "inputPassword": new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
      ]),
    })
  }

  get inputPassword() { 
    return this.form.controls['inputPassword'];
  }

  get inputEmail() {
    return this.form.controls['inputEmail'];
  }  

  toObj(): RegistrationRequest { 
    return { 
      email: this.form.value.inputEmail,
      password: this.form.value.inputPassword,
      rememberMe: true,
    }
  }
}