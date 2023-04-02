import { FormControl, FormGroup, Validators } from "@angular/forms";
import { LoginRequest } from "src/models";

export class LoginFormModel {
  
  form: FormGroup;
  
  constructor() {
    this.form = new FormGroup({
      'inputEmail': new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      'inputPassword': new FormControl('', [
        Validators.required,
      ])
    })
  }
  
  get inputEmail() { 
    return this.form.controls['inputEmail'];
  }

  get inputPassword() { 
    return this.form.controls['inputPassword'];
  }

  toObj(): LoginRequest {
    return { 
      email: this.form.value.inputEmail,
      password: this.form.value.inputPassword,
      rememberMe: true
    }
  }
}