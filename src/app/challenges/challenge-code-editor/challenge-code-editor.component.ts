import { Component, OnInit } from "@angular/core";

import {
    AfterViewInit,
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
  
  const THEME = 'ace/theme/cloud9_day';
  
    @Component({
        selector: 'challenge-code-editor',
        templateUrl: './challenge-code-editor.component.html'
    })

    export class ChallengeCodeEditorComponent implements AfterViewInit, OnInit {
    codeEditor: ace.Ace.Editor;
  
    @ViewChild('codeEditor') codeEditorElmRef: ElementRef;
    
    @Input() disabled = false;
    @Input() currentLanguageObservable: Observable<CodeLanguage>;
    @Input() codeTemplate: Observable<string>;
    @Output() codeValueEmitter: EventEmitter<string> = new EventEmitter<string>();
  
    sourceCode: string;
    selectedLanguage: string;

    private isReadonlyCode = false;
  
    ngOnInit(): void {
        
    }

    ngAfterViewInit(): void {
      this.codeEditor = ace.edit(
        this.codeEditorElmRef.nativeElement,
        this.getEditorOptions()
      );
        this.currentLanguageObservable.subscribe({
            next: res => {
                let language: string;
                switch (res) {
                    case CodeLanguage.c_cpp:
                        language = 'c_cpp';
                        break;
                    case CodeLanguage.csharp:
                        language = 'csharp';
                        break;
                    case CodeLanguage.python:
                        language = 'python';
                        break;
                    default:
                        language = '';
                        break;
                }
                this.setEditorLanguage(language);
                this.basicEditorConfiguration(language);
            },
        });
        this.codeTemplate.subscribe({
            next: res => { this.setEditorTemplate(res) },
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
        if (this.disabled) {
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
        minLines: 30,
        maxLines: 30,
        fontSize: 14,
        fontFamily: 'Cascadia Code',
        wrap: true,
        readOnly: this.disabled,
      };
    }
  
    emitCodeState() {
      this.codeValueEmitter.emit(
        this.codeEditor.getSession().getDocument().getValue()
      );
    }
  }
  

