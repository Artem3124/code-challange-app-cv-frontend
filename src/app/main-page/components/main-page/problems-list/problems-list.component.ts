import { Component, OnInit } from "@angular/core";
import { CodeProblem } from "src/models";
import { CodeProblemHttpService } from "src/shared/services/http/code-problem.service";
import { ProblemListStoreService } from "src/shared/services/store/problem-list-store.service";

@Component({
  selector: 'problems-list',
  templateUrl: './problems-list.component.html',
  styleUrls: ['./problems-list.component.scss', '../../../../../shared/styles/global-elements.scss']
}) export class ProblemsListComponent implements OnInit {

  codeProblems: CodeProblem[] = [];

  constructor(private problemsStore: ProblemListStoreService) {
    this.problemsStore.initiateProblemListFetching();
  }

  ngOnInit(): void {
    this.problemsStore.getProblemList().subscribe({
      next: (response: CodeProblem[]) => {

        console.log(response);
        this.codeProblems = response;
      },
      error: (err: Error) => console.error(err)
    })
  }

  setProblemState(codeProblem: CodeProblem) {
    this.problemsStore.findProblem(codeProblem.uuid)
  } 
}