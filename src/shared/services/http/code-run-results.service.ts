import { Injectable } from "@angular/core";
import { HttpBase } from "./http-base.service";
import { Observable } from "rxjs";
import { CodeRunResultExpanded } from "src/models";

@Injectable()
export class CodeRunResultHttpService { 
  constructor(private http: HttpBase) {}
  
  private readonly controllerPath: string = "CodeRunResult"

  getCodeRunResultsHistory(problemUUID: string): Observable<CodeRunResultExpanded[]> { 
    return this.http.get(`${this.controllerPath}/codeProblem/${problemUUID}`);
  }
}