import { Pipe, PipeTransform } from '@angular/core';
import CodeLanguage from 'src/models/enums/coding-languages.enum';

@Pipe({
  name: 'codeLanguage',
  pure: false,
})
export class CodingLanguagesPipe implements PipeTransform {
  transform(codingLanguages: CodeLanguage): string | null {
    if (codingLanguages === CodeLanguage.c_cpp) {
      return 'C++';
    }

    if (codingLanguages === CodeLanguage.csharp) {
      return 'C#';
    }

    if (codingLanguages === CodeLanguage.javascript) {
      return 'JS';
    } else {
      return null;
    }
  }
}
