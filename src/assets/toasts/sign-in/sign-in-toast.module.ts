import { NgModule } from "@angular/core";
import { AlertModule } from "@coreui/angular";
import { SignInToastComponent } from "src/assets/toasts/sign-in/component/sign-in-toast.component";

@NgModule({
  declarations: [
    SignInToastComponent
  ],
  imports: [
    AlertModule
  ],
  exports: [
    SignInToastComponent
  ]
}) export class SignInToastModule {}