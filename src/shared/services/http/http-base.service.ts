import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class HttpBase { 

    readonly route: string = "https://localhost:7124"

    constructor(private http: HttpClient) {}

    options = {
        withCredentials: true,
    }

    post<P, R>(payload: P, url: string): Observable<R> { 
        return this.http.post<R>(`${this.route}/${url}`, payload, this.options);
    }

    get<R>(url: string): Observable<R> { 
        return this.http.get<R>(`${this.route}/${url}`, this.options);
    }
}