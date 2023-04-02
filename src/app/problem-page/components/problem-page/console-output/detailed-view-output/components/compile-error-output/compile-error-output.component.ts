import { Component, Input } from '@angular/core';
import { CompilationError, TestCaseResult } from 'src/models';

@Component({
  selector: 'compile-error-output',
  templateUrl: './compile-error-output.component.html',
  styleUrls: [
    './compile-error-output.component.scss',
    '../../../../../../../../shared/styles/fonts.scss',
    '../../../../../../../../shared/styles/custom-environment.scss',
    '../../../../../../../../shared/styles/global-elements.scss',
  ],
})
export class CompileErrorOutputComponent {
  @Input() errorsInput: CompilationError[] | TestCaseResult = [
    { message: 'Line 1: ";" - missed' },
    { message: 'Line 3: Expected nigger expression' },
    {
      message:
        'Line 11: I like dajksfgdjaks nfuia sinfvia bsndf kjhawie skdgf asliubfguls aebdfga uisbdglu biasdu gbh',
    },
    { message: 'Line 11: Expected nigger expression' },
    { message: 'Line 12: Expected nigger expression' },
    { message: 'Line 13: Expected nigger expression' },
    { message: 'Line 14: Expected nigger expression' },
    { message: 'Line 15: Expected nigger expression' },
    { message: 'Line 16: Expected nigger expression' },
    { message: 'Line 17: Expected nigger expression' },
  ];

  constructor() {}
}
