import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import * as ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-cloud9_day.js';
import { map, Observable } from 'rxjs';
import CodeLanguage from 'src/models/enums/coding-languages.enum';
import { SourceCodeStoreService } from 'src/shared/services/store/source-code.service';

const THEME: string = 'ace/theme/cloud9_day';

@Component({
  selector: 'code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss'],
})
export class CodeEditorComponent implements AfterViewInit {
  codeEditor: ace.Ace.Editor;

  @ViewChild('codeEditor') codeEditorElmRef: ElementRef;
  @Input() currentLanguage: Observable<CodeLanguage>;
  @Input() codeTemplate: Observable<string>;
  @Output() codeValueEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngAfterViewInit(): void {
    this.configureEditor('csharp');
    this.currentLanguage.subscribe((inputLanguage: CodeLanguage) => {
      this.setEditorLanguage(CodeLanguage[inputLanguage]);
    });
    this.codeTemplate.subscribe((codeTemplate: string) => {
      this.setEditorTemplate(codeTemplate);
    });
    this.emitCodeState();
  }

  private configureEditor(languageToSet: string) {
    const element = this.codeEditorElmRef.nativeElement;
    const editorOptions = this.getEditorOptions();

    this.codeEditor = ace.edit(element, editorOptions);
    this.setEditorTheme(THEME);
    this.setEditorLanguage(languageToSet);
    this.codeEditor.setShowFoldWidgets(true);
  }

  private setEditorLanguage(languageToUpdate: string) {
    console.log(`ace/mode/${languageToUpdate}`);
    this.codeEditor.getSession().setMode(`ace/mode/${languageToUpdate}`);
  }

  private setEditorTheme(theme: string) {
    this.codeEditor.setTheme(theme);
  }

  private setEditorTemplate(codeTemplate: string) {
    console.log(this.codeTemplate);
    this.codeEditor.setValue(codeTemplate, -1);
    this.codeEditor.moveCursorTo(4, 8);
  }

  private getEditorOptions(): Partial<ace.Ace.EditorOptions> {
    const basicEditorOptions: Partial<ace.Ace.EditorOptions> = {
      highlightActiveLine: true,
      minLines: 21,
      maxLines: 21,
      fontSize: 18,
    };

    const extraEditorOptions = {
      fontFamily: 'Cascadia Code',
    };

    const mergedOptions = Object.assign(basicEditorOptions, extraEditorOptions);

    return mergedOptions;
  }

  emitCodeState() {
    console.log(this.codeEditor.getSession().getDocument().getValue());

    this.codeValueEmitter.emit(
      this.codeEditor.getSession().getDocument().getValue()
    );
  }
}
