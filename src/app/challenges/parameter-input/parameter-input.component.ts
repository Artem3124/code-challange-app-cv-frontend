import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CodeProblemParameterInfo } from "src/models";
import { InputParameterView } from "../challenge-create/challenge-create.component";

@Component({
    selector: 'parameter-input',
    templateUrl: 'parameter-input.component.html',
    styleUrls: [
        '../../../shared/styles/custom-form.scss',
        '../../../shared/styles/global-elements.scss',
    ]
})

export class ParameterInputComponent {
    @Input() parameter: InputParameterView;

    @Output() parameterChanged: EventEmitter<InputParameterView> = new EventEmitter<InputParameterView>();
    @Output() parameterDeleted: EventEmitter<number> = new EventEmitter<number>();

    onTypeChange(value: number): void {
        this.parameter.model.type = value;
        this.parameterChanged.emit(this.parameter);
    }

    onNameChange($event: Event): void {
        const target = $event.target as HTMLInputElement;
        this.parameter.model.name = target.value;
        this.parameterChanged.emit(this.parameter);
    }

    onDelete() {
        this.parameterDeleted.emit(this.parameter.id);
    }
}
