import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import CodeLanguage from 'src/models/enums/coding-languages.enum';
import { Dictionary } from 'src/shared/data-types/dictionary.data-type';
import { ConsoleOutputStoreService } from 'src/shared/services/store/console-output-store.service';
import { SourceCodeStoreService } from 'src/shared/services/store/source-code-store.service';

@Component({
  selector: 'code-editor-settings',
  templateUrl: './code-editor-settings.html',
  styleUrls: [
    './code-editor-settings.scss',
    '../../../../../shared/styles/custom.scss',
    '../../../../../shared/styles/fonts.scss',
  ],
})
export class CodeEditorSettingsComponent implements AfterViewInit {
  currentCodeLanguage: CodeLanguage = CodeLanguage.csharp;

  isReadonlyCodeView: boolean = false;

  constructor(
    private sourceCodeStore: SourceCodeStoreService,
    private consoleOutputStore: ConsoleOutputStoreService
  ) {}

  ngAfterViewInit(): void {
    this.onSetLanguage(CodeLanguage.csharp);

    this.sourceCodeStore.getReadonlySourceCode().subscribe({
      next: (source: Dictionary<string> | null) => {
        if (source !== null) {
          this.isReadonlyCodeView = true;
        }
      },
    });
  }

  @Input() availableLanguagesInput: Array<CodeLanguage>;
  @Output() currentLanguageEvent: EventEmitter<CodeLanguage> =
    new EventEmitter<CodeLanguage>();

  onSetLanguage(language: string | CodeLanguage) {
    console.log(language);
    this.currentLanguageEvent.emit(language as CodeLanguage);
  }

  onClick(): void {
    this.isReadonlyCodeView = false;
    this.sourceCodeStore.defaultReadonlyCode();
    this.consoleOutputStore.defaultResultView();
  }
}
