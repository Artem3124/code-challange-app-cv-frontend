import { Component, Input } from '@angular/core';
import { CodeProblem, CodeProblemView } from 'src/models';
import CodeLanguage from 'src/models/enums/coding-languages.enum';

@Component({
  selector: 'last-resolved-problems',
  templateUrl: './last-resolved-problems.component.html',
  styleUrls: ['./last-resolved-problems.component.scss',
  '../../../../shared/styles/global-elements.scss',
  '../../../../shared/styles/fonts.scss', '../user-profile.component.scss'],
})
export class LastResolvedProblemsComponent {
  constructor() {}

  @Input() problems: CodeProblemView[] = [];
  noProblemsCurrentlyAvailable: boolean = this.problems.length <= 0;
}
