import { Injectable } from "@angular/core";
import { HttpBase } from "./http-base.service";
import { Observable } from "rxjs";
import { User, UserUpdateRequest, ValidationResult } from "src/models";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(private http: HttpBase) {}

    private readonly controllerPath = 'User';

    patch(payload: UserUpdateRequest): Observable<ValidationResult> {
        return this.http.patch<ValidationResult, UserUpdateRequest>(`${this.controllerPath}`, payload);
    }

    get(): Observable<User[]> {
        return this.http.get<User[]>(`${this.controllerPath}/all`);
    }
}
