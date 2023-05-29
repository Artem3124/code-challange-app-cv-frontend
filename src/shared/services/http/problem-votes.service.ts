import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Vote, VoteRequest } from "src/models";
import { HttpBase } from "src/shared/services/http/http-base.service";

@Injectable() 
export class ProblemVotesHttpService { 
  constructor(private http: HttpBase) {}

  readonly controllerPath = "CodeProblemVote";

  setVotes(request: VoteRequest): Observable<void> { 
    return this.http.post<VoteRequest, void>(request, `${this.controllerPath}`);
  }
  getVotes(problemUUID: string): Observable<Vote[]> { 
    return this.http.get<Vote[]>(`${this.controllerPath}/${problemUUID}`);
  }
}