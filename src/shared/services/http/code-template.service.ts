import { Injectable } from "@angular/core";
import { HttpBase } from "./http-base.service";
import CodeLanguage from "src/models/enums/coding-languages.enum";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
}) export class CodeTemplateHttpService { 
  constructor(private http: HttpBase) {}

  getCodeTemplate(codeProblemUUID: string, codeLanguage: CodeLanguage): Observable<any> { 
    return this.http.get<any>(`CodeTemplate/${codeProblemUUID}/template/${codeLanguage}`) 
  }
}