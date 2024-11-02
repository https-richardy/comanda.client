import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../app.tokens';
import { HttpClient } from '@angular/common/http';
import { Address } from '../models/address.model';
import { map, Observable } from 'rxjs';
import { Response } from '../payloads/responses/response';

@Injectable({ providedIn: 'root' })
export class AddressService {
    private readonly httpClient: HttpClient;
    private readonly baseAddress: string = `${inject(API_BASE_URL)}api/profile/addresses`

    public constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    public getAddresses(): Observable<Address[]> {
        return this.httpClient
            .get<Response<Address[]>>(this.baseAddress)
            .pipe(
                map(response => {
                    if (response.data && Array.isArray(response.data)) {
                        return response.data;
                    }

                    return [];
                })
            )
    }
}
