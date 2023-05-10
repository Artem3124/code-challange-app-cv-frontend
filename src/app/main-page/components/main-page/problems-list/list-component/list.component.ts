import { Component, OnInit } from "@angular/core";
import { CodeProblem } from "src/models";
import { ProblemListStoreService } from "src/shared/services/store/problem-list-store.service";

@Component({
  selector: 'list-component',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss', '../../../../../../shared/styles/fonts.scss']
}) export class ListComponent implements OnInit { 
  codeProblems: CodeProblem[] = [];

  constructor(private problemsStore: ProblemListStoreService) {
    this.problemsStore.initiateProblemListFetching();
  }
  ngOnInit(): void {
    this.problemsStore.getProblemList().subscribe({
      next: (codeProblems: CodeProblem[]) => this.codeProblems = codeProblems
    })
  }

  setProblemState(codeProblem: CodeProblem) {
    this.problemsStore.findProblem(codeProblem.uuid)
  } 
}