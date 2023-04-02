import { Component } from "@angular/core";
import { LoginFormModel } from "./login.form";
import { AuthHttpService } from "src/shared/services/http/authentication.service";
import { User } from "src/models";
import { Router } from "@angular/router";

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['../register/register.component.scss',
  '../../../../shared/styles/global-elements.scss',
  '../../../../shared/styles/custom-form.scss',
  '../../../../shared/styles/fonts.scss']
}) export class LoginComponent { 

  loginForm: LoginFormModel = new LoginFormModel();

  constructor(private authService: AuthHttpService, private router: Router) {}

  submitLogin() { 
    this.authService.login(this.loginForm.toObj()).subscribe({
      next: (data: User) => {
       // this.router.navigate(['problem/task1']);
        console.log(data)},
      error: (err: Error) => console.error(err),
    })
  }
}