import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { API_BASE_URL } from "../app.tokens";
import { map, Observable } from "rxjs";
import { Settings } from "../models/settings.model";
import { Response } from "../payloads/responses/response";

@Injectable({ providedIn: "root" })
export class SettingsService {
    private readonly httpClient: HttpClient;
    private readonly baseAddress = `${inject(API_BASE_URL)}/settings`;

    public constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    public getSettings(): Observable<Settings> {
        return this.httpClient.get<Response<Settings>>(this.baseAddress)
            .pipe(
                map((response) => {
                    return response.data || {  } as Settings;
                })
            );
    }

    public updateSettings(settings: Settings): Observable<void> {
        return this.httpClient.put(this.baseAddress, settings)
        .pipe(
            map(() => void 0)
        );
    }
}