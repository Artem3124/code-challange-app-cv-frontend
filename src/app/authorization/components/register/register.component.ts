import { Component } from "@angular/core";
import { RegisterFormModel } from "./register.form";
import { ProfileHttpService } from "src/shared/services/http/profile.service";
import { AuthValidator } from "src/shared/services/validators/auth.validator";
import { AuthStoreService } from "src/shared/services/store/auth-store.service";
import { RegistrationRequest } from "src/models";

@Component({
  selector: 'register-component',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss',
  '../../../../shared/styles/global-elements.scss',
  '../../../../shared/styles/custom-form.scss',
  '../../../../shared/styles/fonts.scss',
  '../../../../shared/styles/alerts.scss',
]
}) export class RegisterComponent { 

  registrationForm: RegisterFormModel = new RegisterFormModel(new AuthValidator());

  constructor(private authService: ProfileHttpService, private authStore: AuthStoreService) {
  }

  submitRegistration() { 
    var registrationRequest: RegistrationRequest = this.registrationForm.toObj();

    console.log(registrationRequest);

    this.authStore.initiateRegistration(registrationRequest);
  }
}