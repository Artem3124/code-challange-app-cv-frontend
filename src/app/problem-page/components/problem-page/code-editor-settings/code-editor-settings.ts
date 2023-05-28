import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import CodeLanguage from 'src/models/enums/coding-languages.enum';
import { Dictionary } from 'src/shared/data-types/dictionary.data-type';
import { ConsoleOutputStoreService } from 'src/shared/services/store/console-output-store.service';
import { SourceCodeStoreService } from 'src/shared/services/store/source-code-store.service';
import { StringToCodeLanguagePipe } from './string-to-code-language.pipe';
import { SelectCodeEditorFormModel } from 'src/app/problem-page/components/problem-page/code-editor-settings/select.form';

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
  @Input() availableLanguagesInput: Array<CodeLanguage> = [];
  @Output() currentLanguageEvent: EventEmitter<CodeLanguage> =
    new EventEmitter<CodeLanguage>();

  selectForm: SelectCodeEditorFormModel = new SelectCodeEditorFormModel(
    this.availableLanguagesInput
  );

  currentCodeLanguage: CodeLanguage = CodeLanguage.csharp;
  languageSelectRef: string;
  isReadonlyCodeView = false;

  constructor(
    private sourceCodeStore: SourceCodeStoreService,
    private consoleOutputStore: ConsoleOutputStoreService,
    private stringToCodeProblem: StringToCodeLanguagePipe
  ) {
    this.sourceCodeStore.setSourceCodeLanguage(CodeLanguage.csharp);
  }

  ngAfterViewInit(): void {
    this.onSetLanguage(CodeLanguage.csharp);

    this.sourceCodeStore.getReadonlySourceCodeLanguage().subscribe({
      next: (readonlyLanguage: CodeLanguage | null) => {
        if (readonlyLanguage) {
          console.log(readonlyLanguage);
          this.selectForm.setSelectorValue(readonlyLanguage);
          return;
        }
      },
    });

    this.sourceCodeStore.getReadonlySourceCode().subscribe({
      next: (source: Dictionary<string> | null) => {
        this.isReadonlyCodeView = source !== null;
      },
    });
  }

  onCodeLanguageChange($event: Event): void {
    console.log($event.target as HTMLInputElement);
    const value = ($event.target as HTMLInputElement).value;

    this.onSetLanguage(this.stringToCodeProblem.transform(value));
  }

  onSetLanguage(codeLanguage: CodeLanguage) {
    this.currentCodeLanguage = codeLanguage;
    this.selectForm.setSelectorValue(codeLanguage);
    this.sourceCodeStore.setSourceCodeLanguage(codeLanguage);
    this.currentLanguageEvent.emit(codeLanguage);
  }

  onSelect(codeLanguage: string) {
    this.onSetLanguage(parseInt(codeLanguage));
  }

  onClick(): void {
    this.isReadonlyCodeView = false;
    this.sourceCodeStore.returnToCurrentSolution(this.currentCodeLanguage); // return back to current solution through the effect
    this.consoleOutputStore.defaultResultView();
  }
}
