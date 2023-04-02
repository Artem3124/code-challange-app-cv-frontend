import { Component, OnInit } from "@angular/core";
import { CodeProblem } from "src/models";
import { CodeProblemHttpService } from "src/shared/services/http/code-problem.service";

@Component({
  selector: 'problems-list',
  templateUrl: './problems-list.component.html',
  styleUrls: ['./problems-list.component.scss']
}) export class ProblemsListComponent implements OnInit {

  codeProblems: CodeProblem[] = [];

  constructor(private codeProblemHttp: CodeProblemHttpService) {}

  ngOnInit(): void {
    this.codeProblemHttp.getAllProblems().subscribe({
      next: (response: CodeProblem[]) => {
        console.log(response);
        this.codeProblems = response;
      },
      error: (err: Error) => console.error(err)
    })
  }
}