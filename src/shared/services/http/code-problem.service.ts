import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CodeProblem, CodeSubmission } from "src/models";
import { HttpBase } from "./http-base.service";

@Injectable()
export class CodeProblemHttpService { 
    constructor(private http: HttpBase) {}

    getCodeProblem(codeProblemUUID: string): Observable<CodeProblem> { 
        return this.http.get<CodeProblem>(`CodeProblem/${codeProblemUUID}`);
    }

    getAllProblems(): Observable<CodeProblem[]> {
        return this.http.get<CodeProblem[]>('CodeProblem');
    }
}