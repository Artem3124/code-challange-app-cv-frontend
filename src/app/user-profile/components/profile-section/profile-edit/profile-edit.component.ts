import { Component, Input, OnInit } from "@angular/core";
import { ProfileEditForm } from "./profile-edit.form";
import { FormBuilder } from "@angular/forms";
import { User } from "src/models";
import { UserService } from "src/shared/services/http/user.service";

@Component({
    selector: 'profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['../../../../../shared/styles/custom-form.scss', '../../../../../shared/styles/global-elements.scss']
})

export class ProfileEditComponent implements OnInit {
    @Input() user: User;
    
    formModel: ProfileEditForm;
    loading = false;

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
    ) { }

    ngOnInit(): void {
        this.formModel = new ProfileEditForm(this.formBuilder, this.user);
    }

    update(): void {
        const payload = this.formModel.toPatchRequest();
        
        this.loading = true;
        this.userService.patch(payload)
            .subscribe({
                next: res => this.formModel.setErrors(res?.errors),
                error: ex => {
                    // add error handling...
                }
            }).add(() => this.loading = false);
    }

    reset(): void {
        this.formModel.reset();
    }
}
