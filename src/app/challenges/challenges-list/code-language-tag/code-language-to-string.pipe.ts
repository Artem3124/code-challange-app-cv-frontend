import { Pipe, PipeTransform } from "@angular/core";
import CodeLanguage from "src/models/enums/coding-languages.enum";

@Pipe({
    name: 'codeLanguageToString'
})

export class CodeLanguageToString implements PipeTransform {
    transform(codeLanguage: CodeLanguage): string {
        switch (codeLanguage) {
            case CodeLanguage.csharp: return "C#";
            case CodeLanguage.c_cpp: return "C++";
            case CodeLanguage.python: return "Python";
            default: return '';
        }
    }
}