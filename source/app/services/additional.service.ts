import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../app.tokens';
import { IAdditionalService } from './interfaces/additional.service.interface';
import { map, Observable } from 'rxjs';
import { Additional } from '../models/additional.model';
import { Response } from '../payloads/responses/response';

@Injectable({ providedIn: 'root' })
export class AdditionalService implements IAdditionalService {
    private readonly httpClient: HttpClient;
    private readonly baseAddress: string = `${inject(API_BASE_URL)}api/additionals`;

    public constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    public getAdditionals(): Observable<Additional[]> {
        return this.httpClient.get<Response<Additional[]>>(this.baseAddress).pipe(
            map((response) => {
                if (response.data && Array.isArray(response.data)) {
                    return response.data;
                }

                return [];
            })
        );
    }

    public getAdditionalsByCategory(categoryId: number): Observable<Additional[]> {
        const parameters: any = { categoryId: categoryId };

        return this.httpClient.get<Response<Additional[]>>(`${this.baseAddress}/search`, { params: parameters }).pipe(
            map((response) => {
                if (response.data && Array.isArray(response.data)) {
                    return response.data;
                }

                return [];
            })
        );
    }
}
