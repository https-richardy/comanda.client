import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../app.tokens';
import { HttpClient } from '@angular/common/http';
import { Address } from '../models/address.model';
import { map, Observable } from 'rxjs';
import { Response } from '../payloads/responses/response';
import { AddressRegistrationRequest } from '../payloads/requests/address-payloads/new-address-registration.payload';

@Injectable({ providedIn: 'root' })
export class AddressService {
    private readonly httpClient: HttpClient;
    private readonly baseAddress: string = `${inject(API_BASE_URL)}api/profile/addresses`

    public constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    public registerNewAddress(address: AddressRegistrationRequest): Observable<void> {
        return this.httpClient.post<Response<null>>(this.baseAddress, address).pipe(
            map(() => {
                return void 0;
            })
        )
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

    public deleteAddress(addressId: number): Observable<void> {
        return this.httpClient.delete(`${this.baseAddress}/${addressId}`).pipe(
            map(() => {
                return void 0;
            })
        );
    }
}
