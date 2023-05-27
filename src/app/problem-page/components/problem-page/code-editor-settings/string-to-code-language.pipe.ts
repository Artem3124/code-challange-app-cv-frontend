import { Injectable, Pipe, PipeTransform } from "@angular/core";
import CodeLanguage from "src/models/enums/coding-languages.enum";

@Pipe({
    name: 'toCodeLanguage',
})

@Injectable({
    providedIn: 'root'
})

export class StringToCodeLanguagePipe implements PipeTransform {
    transform(value: string): CodeLanguage {
        switch (value) {
            case "1": return CodeLanguage.csharp;
            case "2": return CodeLanguage.c_cpp;
            case "5": return CodeLanguage.python;
            default: return CodeLanguage.undefined;
        }
    }
}
