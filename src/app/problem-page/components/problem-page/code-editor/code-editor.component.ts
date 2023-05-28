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
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-cloud9_day.js';
import { Observable } from 'rxjs';
import CodeLanguage from 'src/models/enums/coding-languages.enum';
import { SourceCodeStoreService } from 'src/shared/services/store/source-code-store.service';
import { Dictionary } from 'src/shared/data-types/dictionary.data-type';
import { CodeTemplateStoreService } from 'src/shared/services/store/code-template.service';

const THEME = 'ace/theme/cloud9_day';

@Component({
  selector: 'code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss'],
})
export class CodeEditorComponent implements AfterViewInit {
  codeEditor: ace.Ace.Editor;

  @ViewChild('codeEditor') codeEditorElmRef: ElementRef;
  @Input() currentLanguageObservable: Observable<CodeLanguage>;
  @Input() codeTemplate: Observable<string>;
  @Output() codeValueEmitter: EventEmitter<string> = new EventEmitter<string>();

  private codeTemplates: Dictionary<string> | null = null;
  private sourceCodes: Dictionary<string> | null = null;

  private currentLanguage: CodeLanguage = CodeLanguage.csharp;
  private isReadonlyCode = false;
  constructor(
    private sourceCodeStore: SourceCodeStoreService,
    private codeTemplateStore: CodeTemplateStoreService
  ) {}

  ngAfterViewInit(): void {
    this.codeEditor = ace.edit(
      this.codeEditorElmRef.nativeElement,
      this.getEditorOptions()
    );

    this.basicEditorConfiguration('csharp');

    this.codeTemplateStore.getCodeTemplates().subscribe({
      next: (templates: Dictionary<string> | null) => {
        if (!templates) {
          return;
        }

        this.codeTemplates = templates;
      },
      error: (error: Error) => {
        console.error(error);
      },
    });

    this.sourceCodeStore.getReadonlySourceCodeLanguage().subscribe({
      next: (readonlyLanguage: CodeLanguage | null) => {
        if (readonlyLanguage) {
          this.currentLanguage = readonlyLanguage;
          this.setEditorLanguage(CodeLanguage[readonlyLanguage]);
          const sourceCode = this.sourceCodes![this.currentLanguage];
          console.log(sourceCode);
          this.isReadonlyCode = false;
          if (sourceCode) {
            this.setEditorTemplate(sourceCode);
            return;
          }
          this.setEditorTemplate(this.codeTemplates![this.currentLanguage]);
        }
      },
    });

    this.sourceCodeStore.getSourceCode().subscribe({
      next: (sourceCodes: Dictionary<string> | null) => {
        this.sourceCodes = sourceCodes;
      },
      error: (error: Error) => {
        console.error(error);
      },
    });

    this.sourceCodeStore.getReadonlySourceCode().subscribe({
      next: (readonlyCode: Dictionary<string> | null) => {
        if (readonlyCode === null) {
          this.isReadonlyCode = false;

          this.setToView(
            localStorage.getItem(this.currentLanguage.toString()),
            this.isReadonlyCode
          );
          return;
        }
        this.isReadonlyCode = true;

        this.setToView(readonlyCode[this.currentLanguage], this.isReadonlyCode);
      },
    });

    // this.currentLanguageObservable.subscribe((inputLanguage: CodeLanguage) => {
    //   this.currentLanguage = inputLanguage;
    //   this.setEditorLanguage(CodeLanguage[inputLanguage]);
    //   const sourceCode = this.sourceCodes![this.currentLanguage];
    //   if (sourceCode) {
    //     this.setEditorTemplate(sourceCode);
    //     return;
    //   }
    //   this.setEditorTemplate(this.codeTemplates![this.currentLanguage]);
    // });

    this.codeTemplate.subscribe((codeTemplate: string) => {
      this.setEditorTemplate(codeTemplate);
    });

    
  }

  private setToView(code: string | null, isReadonly: boolean) {
    this.codeEditor.session.setUseWorker(false);
    this.codeEditor.setShowPrintMargin(false);
    this.codeEditor.setReadOnly(isReadonly);
    if (code === null) {
      return;
    }
    this.codeEditor.setValue(code, -1);
  }

  private basicEditorConfiguration(languageToSet: string) {
    this.setEditorTheme(THEME);
    this.setEditorLanguage(languageToSet);
    this.codeEditor.setShowFoldWidgets(true);
    this.codeEditor.on('change', () => {
      console.log(this.isReadonlyCode);
      if (this.isReadonlyCode) {
        return;
      }

      this.emitCodeState();
    });
  }

  private setEditorLanguage(languageToUpdate: string) {
    this.codeEditor.getSession().setMode(`ace/mode/${languageToUpdate}`);
  }

  private setEditorTheme(theme: string) {
    this.codeEditor.setTheme(theme);
  }

  private setEditorTemplate(codeTemplate: string) {
    this.codeEditor.setValue(codeTemplate, -1);
    this.codeEditor.moveCursorTo(4, 8);
  }

  private getEditorOptions(): Partial<ace.Ace.EditorOptions> {
    return {
      highlightActiveLine: true,
      minLines: 21,
      maxLines: 21,
      fontSize: 18,
      fontFamily: 'Cascadia Code',
    };
  }

  emitCodeState() {
    this.codeValueEmitter.emit(
      this.codeEditor.getSession().getDocument().getValue()
    );
  }
}
