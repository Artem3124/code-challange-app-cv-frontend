import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpBase } from "./http-base.service";
import CodeLanguage from "src/models/enums/coding-languages.enum";

@Injectable({
    providedIn: 'root'
})
export class CodeLanguageService { 
    constructor(private http: HttpBase) {}

    get(): Observable<CodeLanguage[]> { 
        return this.http.get<CodeLanguage[]>('CodeLanguage');
    }
}