import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import CodeLanguages from 'src/models/enums/coding-languages.enum';

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
    this.onSetLanguage(CodeLanguages.csharp);
  }

  @Input() availableLanguagesInput: Array<CodeLanguages>;
  @Output() currentLanguageEvent: EventEmitter<CodeLanguages> = new EventEmitter<CodeLanguages>();

  onSetLanguage(language: string | CodeLanguages) {
    this.currentLanguageEvent.emit(language as CodeLanguages);
  }
}
