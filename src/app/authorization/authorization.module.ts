import { NgModule } from "@angular/core";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { SidebarComponent } from "./components/sidebar/sidebar";
import { RegisterFormModel } from "./components/register/register.form";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthHttpService } from "src/shared/services/http/authentication.service";
import { AuthorizationPageComponent } from "./components/authorization-page/authorization-page.component";
import { AppRoutingModule } from "../app-routing.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthInterceptor } from "src/shared/services/intererceptors/authentication.interceptor";
import { AuthorizationRoutingModule } from "./authorization-routing.module";

@NgModule({
    imports: [CommonModule, AuthorizationRoutingModule, FormsModule, ReactiveFormsModule],
  declarations: [
    LoginComponent,
    RegisterComponent,
    SidebarComponent,
    AuthorizationPageComponent,
  ],
  exports: [AuthorizationPageComponent],
  providers: [AuthHttpService],
})

export class AuthorizationModule {}