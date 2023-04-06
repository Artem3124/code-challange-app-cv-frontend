import { Component } from "@angular/core";
import { CodeRunResultExpanded } from "src/models";

@Component({
  selector: 'code-runs-history',
  templateUrl: './code-runs-history.component.html',
  styleUrls: ['./code-runs-history.component.scss']
})
export class CodeRunsHistoryComponent {
  constructor() {}

  codeRuns: CodeRunResultExpanded[] = []
}