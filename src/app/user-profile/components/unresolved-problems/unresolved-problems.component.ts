import { Component, Input } from "@angular/core";
import { CodeProblem, CodeProblemView } from "src/models";

@Component({
  selector: 'unresolved-problems',
  templateUrl: './unresolved-problems.component.html',
  styleUrls: ['./unresolved-problems.component.scss', '../../../../shared/styles/global-elements.scss',
  '../../../../shared/styles/fonts.scss',]
}) export class UnresolvedProblemsComponent {

  @Input() problems: CodeProblemView[] = [];

  constructor() {}
}