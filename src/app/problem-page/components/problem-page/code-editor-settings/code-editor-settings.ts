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
import { StringToCodeLanguagePipe } from './string-to-code-language.pipe';

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
    private consoleOutputStore: ConsoleOutputStoreService,
    private stringToCodeProblem: StringToCodeLanguagePipe,
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

  onCodeLanguageChange($event: Event): void {
    const value = ($event.target as HTMLInputElement).value;
    this.onSetLanguage(this.stringToCodeProblem.transform(value));
  }

  onSetLanguage(codeLanguage: CodeLanguage) {
    this.currentLanguageEvent.emit(codeLanguage);
  }

  onClick(): void {
    this.isReadonlyCodeView = false;
    this.sourceCodeStore.defaultReadonlyCode();
    this.consoleOutputStore.defaultResultView();
  }
}
