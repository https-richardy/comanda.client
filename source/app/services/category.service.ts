import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CategoryCreationRequest } from '../payloads/requests/categories-payloads/category-creation.payload';
import { map, Observable } from 'rxjs';
import { API_BASE_URL } from '../app.tokens';
import { Category } from '../models/category.model';
import { Response } from '../payloads/responses/response';

@Injectable({ providedIn: 'root' })
export class CategoryService {
    private readonly httpClient: HttpClient;
    private readonly baseAddress: string = `${inject(API_BASE_URL)}api/categories`;

    public constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    public getAllCategories(): Observable<Array<Category>> {
        return this.httpClient
            .get<Response<Array<Category>>>(this.baseAddress)
            .pipe(
                map((response) => {
                    if (response.data && Array.isArray(response.data)) {
                        return response.data;
                    }

                    return [  ];
                })
            )
    }

    public createCategory(category: CategoryCreationRequest): Observable<void> {
        return this.httpClient.post<Response<null>>(this.baseAddress, category).pipe(
            map(() => void 0)
        );
    }
}
