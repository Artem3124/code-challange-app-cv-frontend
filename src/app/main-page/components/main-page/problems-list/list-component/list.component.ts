import { Component, Input, OnInit } from '@angular/core';
import { ProblemListFilter } from 'src/app/main-page/components/main-page/problems-list/models/filter.model';
import { CodeProblem, CodeProblemView } from 'src/models';
import ProblemComplexity from 'src/models/enums/problem-rarity.enum';
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
