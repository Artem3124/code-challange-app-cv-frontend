import { Pipe, PipeTransform } from '@angular/core';
import CodeLanguage from 'src/models/enums/coding-languages.enum';

@Pipe({
  name: 'codeLanguage',
  pure: false,
})
export class CodingLanguagesPipe implements PipeTransform {
  transform(codingLanguages: CodeLanguage): string | null {
    switch(codingLanguages) {
      case(CodeLanguage.c_cpp): { 
        return 'C++';
      }
      case(CodeLanguage.csharp): { 
        return 'C#';
      }
      case(CodeLanguage.javascript): { 
        return 'JS';
      }
      case(CodeLanguage.python): { 
        return 'Py';
      }
      default: { 
        return null;
      }
    }
  }
}
