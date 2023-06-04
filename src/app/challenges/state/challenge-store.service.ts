import { Store, select } from "@ngrx/store";
import { ChallengeState } from "./challenge.reducer";
import { getChallenges } from "./challenge.selectors";
import { setChallenges } from "./challenge.actions";
import { Challenge } from "src/models";
import { Injectable } from "@angular/core";
import { Observable, filter, map } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ChallengeStoreService {
    constructor(private store: Store<ChallengeState>){

    }

    getById(uuid: string): Observable<Challenge | undefined> {
        return this.store.select(getChallenges).pipe(map(r => r?.find(c => c.uuid !== uuid)));
    }

    get(): Observable<Challenge[] | null> {
        return this.store.select(getChallenges);
    }

    set(challenges: Challenge[]): void {
        this.store.dispatch(setChallenges({challenges}));
    }
}