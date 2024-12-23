import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../app.tokens';
import { AuthenticationCredentials } from '../payloads/requests/identity-payloads/authenticationCredentials';
import { map, Observable } from 'rxjs';
import { AuthenticationResponse } from '../payloads/responses/identity-payloads/authenticationResponse';
import { Response } from '../payloads/responses/response';

@Injectable({ providedIn: "root" })
export class AuthenticationService {
    private readonly httpClient: HttpClient;
    private readonly baseAddress = `${inject(API_BASE_URL)}api/identity`;

    public constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    public authenticate(credentials: AuthenticationCredentials): Observable<AuthenticationResponse> {
        return this.httpClient
            .post<Response<AuthenticationResponse>>(`${this.baseAddress}/authenticate`, credentials)
            .pipe(
                map((response) => response.data as AuthenticationResponse)
            )
    }
}
