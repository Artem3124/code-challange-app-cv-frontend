import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { RegistrationRequest } from 'src/models';
import { AuthValidator } from 'src/shared/services/validators/auth.validator';

export class RegisterFormModel {
  form: FormGroup;

  constructor(private authValidator: AuthValidator) {
    this.form = new FormGroup({
      inputEmail: new FormControl('', [Validators.required, Validators.email]),
      inputFirstPassword: new FormControl('', [
        Validators.required,
        this.authValidator.inputLengthValidation('Password', 8, 16),
        this.authValidator.checkPasswordMatchValidator(),
      ]),
      inputSecondPassword: new FormControl('', [
        Validators.required,
        this.authValidator.inputLengthValidation('Password', 8, 16),
        this.authValidator.checkPasswordMatchValidator(),
      ]),
    });
  }

  get inputSecondPassword() {
    return this.form.controls['inputSecondPassword'];
  }

  get inputFirstPassword() {
    return this.form.controls['inputFirstPassword'];
  }

  get inputEmail() {
    return this.form.controls['inputEmail'];
  }

  toObj(): RegistrationRequest {
    return {
      email: this.form.value.inputEmail,
      password: this.form.value.inputFirstPassword,
      rememberMe: true,
    };
  }
}
