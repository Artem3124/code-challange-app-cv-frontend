import { Pipe, PipeTransform } from '@angular/core';
import CodeLanguages from 'src/models/enums/coding-languages.enum';

@Pipe({
  name: 'codeLanguage',
  pure: false,
})
export class CodingLanguagesPipe implements PipeTransform {
  transform(codingLanguages: CodeLanguages): string | null {
    if (codingLanguages === CodeLanguages.c_cpp) {
      return 'C++';
    }

    if (codingLanguages === CodeLanguages.csharp) {
      return 'C#';
    }

    if (codingLanguages === CodeLanguages.javascript) {
      return 'JS';
    } else {
      return null;
    }
  }
}
