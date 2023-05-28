import { Pipe, PipeTransform } from "@angular/core";
import { CodeProblemState } from "src/models";

@Pipe({
    name: 'stateIcon'
})

export class CodeProblemStateIcon implements PipeTransform {
    transform(state: CodeProblemState): StateIcon | null {
        switch (state)
        {
        case CodeProblemState.Attended:
            return { icon: 'check_circle', color: 'green', tooltip: 'Attended' };
        case CodeProblemState.Resolved:
            return { icon: 'edit_square', color: '#457E9D', tooltip: 'Solved' };
        default:
            return null;
        }
    }
}

export interface StateIcon {
    icon: string;
    color: string;
    tooltip: string;
}
