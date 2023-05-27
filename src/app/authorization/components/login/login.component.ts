import { Component } from '@angular/core';
import { LoginFormModel } from './login.form';
import { ProfileHttpService } from 'src/shared/services/http/profile.service';
import { Router } from '@angular/router';
import { AuthValidator } from 'src/shared/services/validators/auth.validator';
import { AuthStoreService } from 'src/shared/services/store/auth-store.service';

@Component({
    selector: 'login-component',
    templateUrl: './login.component.html',
    styleUrls: [
        '../register/register.component.scss',
        '../../../../shared/styles/global-elements.scss',
        '../../../../shared/styles/custom-form.scss',
        '../../../../shared/styles/fonts.scss',
        '../../../../shared/styles/alerts.scss',
    ],
})
export class LoginComponent {
    loginForm: LoginFormModel = new LoginFormModel(new AuthValidator());

    constructor(private authStore: AuthStoreService, private authService: ProfileHttpService, private router: Router) {
    }

    submitLogin() {
        this.authStore.initiateLogin(this.loginForm.toObj());
    }
}
