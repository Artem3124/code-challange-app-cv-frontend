import { FormControl, FormGroup, Validators } from "@angular/forms";
import { LoginRequest } from "src/models";
import { AuthValidator } from "src/shared/services/validators/auth.validator";

export class LoginFormModel {
  
  form: FormGroup;
  
  constructor(private authValidator: AuthValidator) {
    this.form = new FormGroup({
      'inputEmailOrLogin': new FormControl('', [
        Validators.required,
      ]),
      'inputPassword': new FormControl('', [
        Validators.required,
        this.authValidator.inputLengthValidation('Password', 8, 16)
      ])
    })
  }
  
  get inputEmailOrLogin() { 
    return this.form.controls['inputEmailOrLogin'];
  }

  get inputPassword() { 
    return this.form.controls['inputPassword'];
  }

  toObj(): LoginRequest {
    return { 
      email: this.form.value.inputEmailOrLogin,
      password: this.form.value.inputPassword,
      rememberMe: true
    }
  }
}