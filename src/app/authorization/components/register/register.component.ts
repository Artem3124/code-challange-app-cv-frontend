import { Component } from "@angular/core";
import { RegisterFormModel } from "./register.form";
import { AuthHttpService } from "src/shared/services/http/authentication.service";

@Component({
  selector: 'register-component',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss',
  '../../../../shared/styles/global-elements.scss',
  '../../../../shared/styles/custom-form.scss',
  '../../../../shared/styles/fonts.scss' 
]
}) export class RegisterComponent { 

  registrationForm: RegisterFormModel = new RegisterFormModel();

  constructor(private authService: AuthHttpService) {}

  submitRegistration() { 
    var registRequest = this.registrationForm.toObj();

    console.log(registRequest);

    this.authService.register(registRequest).subscribe({
      next: (response: any) => console.log(response),
      error: (error: Error) => console.error(error)
    })
  }
}