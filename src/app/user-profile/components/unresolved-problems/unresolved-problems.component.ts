import { Component, Input } from "@angular/core";
import { CodeProblemView } from "src/models";

@Component({
    selector: 'unresolved-problems',
    templateUrl: './unresolved-problems.component.html',
    styleUrls: ['./unresolved-problems.component.scss', '../../../../shared/styles/global-elements.scss',
        '../../../../shared/styles/fonts.scss', '../user-profile.component.scss']
}) export class UnresolvedProblemsComponent {

  @Input() problems: CodeProblemView[] = [];

  constructor() {}
}