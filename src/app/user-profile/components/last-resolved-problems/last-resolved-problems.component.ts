import { Component, Input } from '@angular/core';
import { CodeProblemView } from 'src/models';

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
}
