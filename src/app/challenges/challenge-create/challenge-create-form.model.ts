import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ChallengeCreateRequest, CodeProblemParameterInfo } from "src/models";
import { InputParameterView } from "./challenge-create.component";

export class ChallengeCreateFormModel {
    form: FormGroup;
    
    constructor(formBuilder: FormBuilder) {
        this.form = formBuilder.group({
            name: [ '', [Validators.required, Validators.minLength(3), Validators.maxLength(30)] ],
            description: [ '', [ Validators.required, Validators.maxLength(1000) ] ],
            isPrivate: [ false ],
            allowedUsers: [ [] ],
            allowInvalidSyntaxSubmit: [ true ],
            parameters: [ [] ],
            returnType: [ 0 ],
            timeLimit: [ 15, Validators.required ],
            endDateTimeUtc: [ '', Validators.required ],
            allowedLanguages: [ [], Validators.required ]
        });
    }

    toRequestObject(): ChallengeCreateRequest {
        return {
            name: this.name?.value,
            description: this.description?.value,
            timeLimitMinutes: this.timeLimit?.value,
            endDateTimeUtc: this.endDateTimeUtc?.value,
            isPrivate: this.isPrivate?.value,
            allowedLanguages: this.allowedLanguages?.value,
            allowedUsers: this.allowedUsers?.value,
            allowInvalidSyntaxSubmit: this.allowInvalidSyntaxSubmit?.value,
            methodInfo: {
                name: '',
                parameters: this.parameters?.value.map((p: InputParameterView) => p.model),
                returnType: this.returnType.value,
            },
        };
    }

    isAllowedUsersDisabled(): boolean {
        return !this.isPrivate.value;
    }

    get parameters(): FormControl {
        return this.form.get('parameters') as FormControl;
    }

    get endDateTimeUtc(): FormControl {
        return this.form.get('endDateTimeUtc') as FormControl;
    }

    get allowedLanguages(): FormControl {
        return this.form.get('allowedLanguages') as FormControl;
    }

    get timeLimit(): FormControl {
        return this.form.get('timeLimit') as FormControl;
    }

    get name(): FormControl {
        return this.form.get('name') as FormControl;
    }

    get description(): FormControl {
        return this.form.get('description') as FormControl;
    }

    get isPrivate(): FormControl {
        return this.form.get('isPrivate') as FormControl;
    }

    get allowedUsers(): FormControl {
        return this.form.get('allowedUsers') as FormControl;
    }

    get allowInvalidSyntaxSubmit(): FormControl {
        return this.form.get('allowInvalidSyntaxSubmit') as FormControl;
    }

    get parameterNames(): FormControl {
        return this.form.get('parameterNames') as FormControl;
    }

    get parameterTypes(): FormControl {
        return this.form.get('parameterTypes') as FormControl;
    }

    get returnType(): FormControl {
        return this.form.get('returnType') as FormControl;
    }

    get disabled(): boolean {
        return this.form.disabled;
    }

    get invalid(): boolean {
        return this.form.invalid;
    }

    get untouched(): boolean {
        return this.form.untouched;
    }
}