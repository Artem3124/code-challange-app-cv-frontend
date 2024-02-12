import { Injectable } from "@angular/core";
import { HttpBase } from "./http-base.service";
import { Observable } from "rxjs";
import { Tag } from "src/models";

@Injectable({
    providedIn: 'root'
})
export class TagService {
    constructor(private http: HttpBase) {}

    private readonly controllerPath = 'CodeProblemTag';

    get(): Observable<Tag[]> {
        return this.http.get<Tag[]>(`${this.controllerPath}`);
    }
}
