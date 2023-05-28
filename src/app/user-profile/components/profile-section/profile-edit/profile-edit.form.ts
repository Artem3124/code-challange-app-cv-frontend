import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { User, UserAttribute, UserUpdateRequest, ValidationError } from "src/models";

export class ProfileEditForm {
    form: FormGroup
    
    private actualLogin: string;
    private actualEmail: string;

    constructor (
        private formBuilder: FormBuilder,
        user: User,
    ) {
        this.form = this.formBuilder.group({
            login: [ user?.login, Validators.required ],
            email: [ user?.email, [ Validators.required, Validators.email ] ],
            password: [ null, this.passwordRepeatValidator() ],
            oldPassword: [ null, this.passwordRepeatValidator() ], 
        });

        this.actualLogin = user?.login;
        this.actualEmail = user?.email;
    }

    passwordRepeatValidator = () => (control: AbstractControl): ValidationErrors | null => {
        let validationState: ValidationErrors | null = null;
        if (!this.password?.value?.length || (!!this.oldPassword?.value && !!this.oldPassword?.value)) {
            this.oldPassword?.setErrors(null);
            this.password?.setErrors(null);

            return null;
        }

        if (!this.oldPassword?.value && !!this.password?.value) {
            validationState = { requiredPassword: true };
        }

        return validationState;
    }

    toPatchRequest(): UserUpdateRequest {
        return {
            login: this.login?.value,
            email: this.email?.value,
            oldPassword: this.hasValue(this.oldPassword) ? this.oldPassword.value : null,
            newPassword: this.hasValue(this.password) ? this.password.value : null,
        }
    }

    setErrors(errors: ValidationError[]): void {
        if (!errors?.length) {
            return;
        }

        errors.forEach(e => {
            switch (e.attribute) {
            case UserAttribute.Login:
                if (e.code === "user_exists") {
                    this.login.setErrors({duplicate: true});
                }
                break;
            case UserAttribute.Email:
                if (e.code === "user_exists") {
                    this.email.setErrors({duplicate: true});
                }
                if (e.code === "email_invalid") {
                    this.email.setErrors({email: true});
                }
                break;
            case UserAttribute.Password:
                if (e.code === "password_length_invalid") {
                    this.password.setErrors({passwordLength: true});
                }
                if (e.code === "password_update_mismatch") {
                    this.oldPassword.setErrors({mismatch: true});
                    this.oldPassword.markAsDirty();
                }
            }
        });
    }

    isChanged(): boolean {
        return this.login.value !== this.actualLogin || this.email.value !== this.actualEmail || !!this.password.value;
    }

    reset(): void {
        this.login.setValue(this.actualLogin);
        this.email.setValue(this.actualEmail);
        this.password.reset();
        this.oldPassword.reset();
    }

    get login(): FormControl {
        return this.form?.get('login') as FormControl;
    }

    get email(): FormControl {
        return this.form?.get('email') as FormControl;
    }

    get password(): FormControl {
        return this.form?.get('password') as FormControl;
    }

    get oldPassword(): FormControl {
        return this.form?.get('oldPassword') as FormControl;
    }

    get invalid(): boolean {
        return this.email.invalid ||
            this.login.invalid ||
            (this.password?.invalid && !this.password.pristine) ||
            (this.oldPassword?.invalid && !this.oldPassword?.pristine);
    }

    get disabled(): boolean {
        return this.form.disabled;
    }

    private hasValue(control: FormControl): boolean {
        return !!control?.value?.length;
    }
}