import { Component, Input } from '@angular/core';
import { CodeProblem, CodeProblemView } from 'src/models';
import { ProblemListStoreService } from 'src/shared/services/store/problem-list-store.service';

@Component({
    selector: 'list-component',
    templateUrl: './list.component.html',
    styleUrls: [
        './list.component.scss',
        '../../../../../../shared/styles/fonts.scss',
    ],
})
export class ListComponent {
  @Input() codeProblems: CodeProblem[] | CodeProblemView[] = [];

  constructor(private problemsStore: ProblemListStoreService) {
  }

  setProblemState(codeProblem: CodeProblem | CodeProblemView) {
      this.problemsStore.findProblem(codeProblem.uuid);
  }
}
