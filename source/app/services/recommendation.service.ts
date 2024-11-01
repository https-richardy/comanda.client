import { inject, Injectable } from '@angular/core';
import { IRecommendationService } from './interfaces/recommendation.service.interface';
import { map, Observable } from 'rxjs';
import { Recommendation } from '../payloads/responses/recommendation-payloads/recommendation';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../app.tokens';
import { Response } from '../payloads/responses/response';

@Injectable({ providedIn: 'root' })
export class RecommendationService implements IRecommendationService {
    private readonly httpClient: HttpClient;
    private readonly baseAddress: string = `${inject(API_BASE_URL)}api/recommendation`;

    public constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    public getRecommendation(): Observable<Recommendation> {
        return this.httpClient.get<Response<Recommendation>>(this.baseAddress).pipe(
            map((response) => {
                if (response.data) {
                    return response.data;
                }

                return {} as Recommendation;
            })
        );
    }
}
