import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CodeRunResultExpanded } from 'src/models';
import { RunType } from 'src/models/enums/run-type.enum';
import { Dictionary } from 'src/shared/data-types/dictionary.data-type';
import { CodeRunsStoreService } from 'src/shared/services/store/code-runs-store.service';
import { ConsoleOutputStoreService } from 'src/shared/services/store/console-output-store.service';
import { SourceCodeStoreService } from 'src/shared/services/store/source-code-store.service';

@Component({
  selector: 'code-runs-history',
  templateUrl: './code-runs-history.component.html',
  styleUrls: ['./code-runs-history.component.scss'],
})
export class CodeRunsHistoryComponent implements OnInit {
  readonly codeProblemUUID: string = this.router.url.slice(9, 45);

  constructor(
    private sourceCodeStore: SourceCodeStoreService,
    private codeRunsStore: CodeRunsStoreService,
    private router: Router,
    private consoleOutputStore: ConsoleOutputStoreService
  ) {}

  ngOnInit(): void {
    this.codeRunsStore.initiateGettingCodeSubmissions(this.codeProblemUUID);

    this.codeRunsStore.getSubmissionHistory().subscribe({
      next: (response: CodeRunResultExpanded[]) => {
        if (!response) {
          this.codeRunsStore.initiateGettingCodeSubmissions(
            this.codeProblemUUID
          );
        }
        this.codeRuns = response
          .filter(r => r.runType === RunType.Submit)
          .sort((a, b) => {
            return (
              new Date(b.dateTimeUtc).getTime() -
              new Date(a.dateTimeUtc).getTime()
            );
          });
      },
    });

    this.sourceCodeStore.getReadonlySourceCode().subscribe({
      next: (readonlyState: Dictionary<string> | null) => {
        if (readonlyState === null) {
          this.selectedIndex = -1;
        }
      },
    });
  }

  setCodeRun(_index: number, codeRun: CodeRunResultExpanded) {
    this.selectedIndex = _index;

    this.consoleOutputStore.setRunResultView(codeRun);

    this.sourceCodeStore.setReadonlySourceCodeLanguage(codeRun.codeLanguage);
    this.sourceCodeStore.setReadonlySourceCode(
      codeRun.sourceCode,
      codeRun.codeLanguage
    );
  }

  selectedIndex: number;
  codeRuns: CodeRunResultExpanded[] = [];
}
