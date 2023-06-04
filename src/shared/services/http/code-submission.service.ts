import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CodeRunProgress, CodeRunResultExpanded, CodeSubmission } from "src/models";
import { CodeRunStage } from "src/models/enums/code-run-stage.enum";
import { HttpBase } from "./http-base.service";

@Injectable({
    providedIn: 'root'
}) export class CodeSubmissionHttpService { 
    constructor(private http: HttpBase) {}

    readonly controllerPath: string = 'CodeSubmissions';

    checkSubmissionStatus(submittingProblemUUID: string): Observable<CodeRunProgress> { 
        return this.http.get<CodeRunProgress>(`${this.controllerPath}/${submittingProblemUUID}/progress`) 
    }

    submitCode(codeSubmission: CodeSubmission): Observable<string> {
        return this.http.post<CodeSubmission, string>(codeSubmission, this.controllerPath);
    }

    submitChallengeCode(codeSubmission: CodeSubmission): Observable<string> {
        return this.http.post<CodeSubmission, string>(codeSubmission, this.controllerPath + '/challenge');
    }
}