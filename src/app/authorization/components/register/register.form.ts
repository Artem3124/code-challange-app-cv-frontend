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
            inputLogin: new FormControl('', [
                Validators.required,
                this.authValidator.inputLoginValidator('Login'),
                this.authValidator.inputLengthValidation('Login', 4, 32),
            ]),
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

    get inputLogin() {
        return this.form.controls['inputLogin'];
    }

    toObj(): RegistrationRequest {
        return {
            login: this.form.value.inputLogin,
            email: this.form.value.inputEmail,
            password: this.form.value.inputFirstPassword,
            repeatPassword: this.form.value.inputSecondPassword,
            rememberMe: true,
        };
    }
}
