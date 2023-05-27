import { Component, Input, OnInit } from '@angular/core';
import { CodeRunResultExpanded } from 'src/models';
import { CodeRunOutcome } from 'src/models/enums/code-run-outcome.enum';
import { Dictionary } from 'src/shared/data-types/dictionary.data-type';
import { SourceCodeStoreService } from 'src/shared/services/store/source-code-store.service';

@Component({
    selector: 'code-run',
    templateUrl: './code-run.component.html',
    styleUrls: [
        '../../../../../../shared/styles/fonts.scss',
        './code-run.component.scss',
        '../../../../../../shared/styles/custom-form.scss',
    ],
})
export class CodeRunComponent implements OnInit {
    constructor() {}

  @Input() codeRun: CodeRunResultExpanded;
  codeRunOutcome: string;

  ngOnInit(): void {
      this.codeRunOutcome = this.convertToString(this.codeRun.codeRunOutcomeId);
  }

  private convertToString(codeRunOutcome: CodeRunOutcome) {
      return CodeRunOutcome[codeRunOutcome].replace(/([a-z])([A-Z])/g, '$1 $2');
  }
}
