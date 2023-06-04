import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ChallengeCreateFormModel } from "./challenge-create-form.model";
import { CodeProblemParameterInfo, User } from "src/models";
import { CodeLanguageService } from "src/shared/services/http/code-language.service";
import CodeLanguage from "src/models/enums/coding-languages.enum";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { UserService } from "src/shared/services/http/user.service";
import { ChallengeService } from "src/shared/services/http/challenge.service";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: 'challenge-create',
    templateUrl: './challenge-create.component.html',
    styleUrls: [
        '../../../shared/styles/custom-form.scss',
        '../../../shared/styles/global-elements.scss',
        './challenge-create.component.scss',
    ]
})

export class ChallengeCreateComponent implements OnInit {

    @ViewChild('discardConfirmationModal') discardConfirmationModal: any;

    data: string;
    allowedUsers: string = '';
    formModel: ChallengeCreateFormModel;
    codeLanguages: CodeLanguage[];
    filteredUsers: User[] = [];
    users: User[];
    parameters: InputParameterView[] = [
        { id: 0, model: { name: '', type: 0 }},
    ];

    constructor(
        formBuilder: FormBuilder,
        private codeLanguageService: CodeLanguageService,
        private modalService: NgbModal,
        private router: Router,
        private userService: UserService,
        private challengeService: ChallengeService,
        private toastService: ToastrService,
    ) {
        this.formModel = new ChallengeCreateFormModel(formBuilder);
    }

    ngOnInit(): void {
        this.userService.get()
            .subscribe({
                next: res => this.users = res,
            });
        this.codeLanguageService.get()
            .subscribe({
                next: res => this.codeLanguages = res,
            });
    }

    isLanguageAllowed(codeLanguage: CodeLanguage): boolean {
        return this.formModel.allowedLanguages.value.some((l: CodeLanguage) => l === codeLanguage);
    } 

    onUserFilter($event: Event): void {
        const target = $event.target as HTMLInputElement;
        const list = target.value.split(', '); 
        if (!target.value?.length || (!!list.length && !list[0].length)) {
            this.filteredUsers.length = 0;
        }
        else {
            const last = list[list.length - 1];
            this.filteredUsers = this.users.filter(u => u.login.includes(last));
        }
    }

    switchAllowedLanguages(codeLanguage: CodeLanguage) {
        const allowedLanguages = this.formModel.allowedLanguages.value as CodeLanguage[];
        const index = allowedLanguages.findIndex(l => l === codeLanguage);
        if (index === -1) {
            allowedLanguages.push(codeLanguage);
        }
        else {
            allowedLanguages.splice(index, 1);
        }

        this.formModel.allowedLanguages.setValue(allowedLanguages);
    }

    onUserSelected(user: User): void {
        const selected = this.formModel.allowedUsers?.value as string[];
        const index = selected.indexOf(user.uuid);

        if (index === -1) {
            selected.push(user.uuid);
            this.formModel.allowedUsers.setValue(selected);
            this.allowedUsers += `${user.login}, `;
        }
        else {
            const usersIds = this.formModel.allowedUsers.value as string[];
            this.allowedUsers = `${this.users.filter(u => usersIds.includes(u.uuid)).map(u => u.login).join(', ')}`;
        }
    }

    onAllowedUserChanged(users: string[]): void {
        if (!this.formModel.isPrivate?.value) {
            return;
        }

        this.formModel.allowedUsers.setValue(users);
    }

    onInputParameterDelete(id: number) {
        const index = this.parameters.findIndex(p => p.id === id)
        this.parameters.splice(index, 1);
    }

    onInputParameterChanged(value: InputParameterView): void {
        const parameters = this.formModel.parameters.value as InputParameterView[];
        const index = parameters.findIndex(p => p.id === value.id);
        if (index === -1) {
            parameters.push(value);
        }
        else {
            parameters[index] = {...value};
        }
        this.formModel.parameters.setValue(parameters);
    }

    onReturnTypeChange(value: number): void {
        this.formModel.returnType.setValue(value);
    }

    addInputParameter() {
        this.parameters.push({
            id: this.parameters.length,
            model: {
                name: '',
                type: 0
            },
        });
    }

    back(): void {
        if (this.formModel.untouched) {
            this.backConfirm(null);
        }
        else {
            this.modalService.open(this.discardConfirmationModal);
        }
    }

    backConfirm(modal: any): void {
        modal?.close();

        this.router.navigate(['./challenges']);
    }

    create(): void {
        const payload = this.formModel.toRequestObject();

        this.challengeService.create(payload).subscribe({
            next: () => {
                this.toastService.success('Challenge create successfully');
                setTimeout(() => this.router.navigate(['./challenges']), 2000); 
            },
            error: () => this.toastService.error('Unexpected error ocurred while creating challenge'),
        })
    }

    onDataChange(value: string): void {
        this.data = value;
        this.formModel.description.setValue(value);
    }
}

export class InputParameterView {
    id: number;
    model: CodeProblemParameterInfo;
}
