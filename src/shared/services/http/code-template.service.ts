import { Injectable } from "@angular/core";
import { HttpBase } from "./http-base.service";
import CodeLanguage from "src/models/enums/coding-languages.enum";
import { Observable } from "rxjs";
import { CodeProblem, CodeProblemTemplate } from "src/models";

@Injectable({
  providedIn: 'root'
}) export class CodeTemplateHttpService { 
  constructor(private http: HttpBase) {}

  getCodeTemplate(codeProblemUUID: string, codeLanguage: CodeLanguage): Observable<CodeProblemTemplate> { 
    return this.http.get<CodeProblemTemplate>(`CodeTemplate/${codeProblemUUID}/template/${codeLanguage}`) 
  }

  getCodeTemplates(codeProblemUUID: string): Observable<CodeProblemTemplate[]> { 
    return this.http.get<CodeProblemTemplate[]>(`CodeTemplate?codeProblemUUID=${codeProblemUUID}`)
  }
}