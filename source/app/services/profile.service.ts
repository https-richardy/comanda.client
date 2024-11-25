import { inject, Injectable } from '@angular/core';
import { IProfileService } from './interfaces/profile.service.interface';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../app.tokens';
import { Observable } from 'rxjs';
import { ProfileInformation } from '../payloads/responses/identity-payloads/profileInformation';

@Injectable({ providedIn: 'root' })
export class ProfileService implements IProfileService {
    private readonly httpClient: HttpClient;
    private readonly baseAddress: string = `${inject(API_BASE_URL)}api/identity`;

    public constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    public getProfileInformation(): Observable<ProfileInformation> {
        return this.httpClient.get<ProfileInformation>(`${this.baseAddress}`);
    }
}
