import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import CodeLanguage from 'src/models/enums/coding-languages.enum';

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
  currentCodeLanguage: string = 'C#';

  constructor() {}
  ngAfterViewInit(): void {
    this.onSetLanguage(CodeLanguage.csharp);
  }

  @Input() availableLanguagesInput: Array<CodeLanguage>;
  @Output() currentLanguageEvent: EventEmitter<CodeLanguage> = new EventEmitter<CodeLanguage>();

  onSetLanguage(language: string | CodeLanguage) {
    this.currentLanguageEvent.emit(language as CodeLanguage);
  }
}
