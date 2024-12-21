import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { Summary } from "../payloads/responses/summary-payloads/summary.payload";
import { Response } from "../payloads/responses/response";
import { API_BASE_URL } from "../app.tokens";

@Injectable({ providedIn: "root" })
export class SummaryService {
    private readonly httpClient: HttpClient;
    private readonly baseAddress: string = `${inject(API_BASE_URL)}api/summary`

    public constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    public getSummary(): Observable<Summary> {
        return this.httpClient.get<Response<Summary>>(this.baseAddress).pipe(
            map((response) => response.data as Summary)
        );
    }
}