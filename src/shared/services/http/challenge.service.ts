import { Injectable } from "@angular/core";
import { HttpBase } from "./http-base.service";
import { Observable } from "rxjs";
import { Challenge, ChallengeAttempt, ChallengeCreateRequest, ChallengeSubmitRequest, ChallengeUpdateRequest } from "src/models";

@Injectable({
    providedIn: 'root'
})

export class ChallengeService { 
    constructor(private http: HttpBase) {}

    getAll(): Observable<Challenge[]> { 
        return this.http.get<Challenge[]>('Challenge');
    }

    get(uuid: string): Observable<Challenge> {
        return this.http.get<Challenge>(`Challenge/${uuid}`);
    }

    start(uuid: string): Observable<ChallengeAttempt> {
        return this.http.get<ChallengeAttempt>(`Challenge/start/${uuid}`);
    }

    submit(payload: ChallengeSubmitRequest): Observable<void> {
        return this.http.patch('Challenge', payload);
    }

    create(payload: ChallengeCreateRequest): Observable<string> {
        return this.http.post<ChallengeCreateRequest, string>(payload, 'Challenge');
    }

    getAttempt(uuid: string): Observable<ChallengeAttempt> {
        return this.http.get<ChallengeAttempt>(`Challenge/attempt/${uuid}`);
    }

    patch(uuid: string, payload: ChallengeUpdateRequest): Observable<void> {
        return this.http.patch(`Challenge/review/${uuid}`, payload)
    }
}
