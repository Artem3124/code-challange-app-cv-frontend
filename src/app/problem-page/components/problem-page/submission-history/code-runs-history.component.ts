import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CodeRunResultExpanded } from 'src/models';
import { CodeRunsStoreService } from 'src/shared/services/store/code-runs-store.service';
import { ProblemStoreService } from 'src/shared/services/store/problem-store.service';

@Component({
  selector: 'code-runs-history',
  templateUrl: './code-runs-history.component.html',
  styleUrls: ['./code-runs-history.component.scss'],
})
export class CodeRunsHistoryComponent implements OnInit {
  readonly codeProblemUUID: string = this.router.url.slice(9, 45);

  constructor(
    private codeRunsStore: CodeRunsStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.codeRunsStore.getSubmissionHistory().subscribe({
      next: (response: CodeRunResultExpanded[]) => {
        if (!response) {
          this.codeRunsStore.initiateGettingCodeSubmissions(
            this.codeProblemUUID
          );
        }
        
        this.codeRuns = response;
      },
    });
  }

  codeRuns: CodeRunResultExpanded[] = [];
}
