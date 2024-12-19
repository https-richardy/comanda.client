import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../app.tokens';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CheckoutSession } from '../payloads/responses/checkout-payloads/checkoutSession';
import { Response } from '../payloads/responses/response';
import { Address } from '../models/address.model';
import { OrderConfirmation } from '../payloads/responses/checkout-payloads/order-confirmation.payload';

@Injectable({ providedIn: 'root' })
export class CheckoutService {
    private readonly httpClient: HttpClient
    private readonly baseAddress: string = `${inject(API_BASE_URL)}api/checkout`

    public constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    public getCheckoutSession(shippingAddress: Address): Observable<CheckoutSession> {
        return this.httpClient
            .post<Response<CheckoutSession>>(this.baseAddress, { shippingAddressId: shippingAddress.id })
            .pipe(
                map((response: Response<CheckoutSession>) => {
                    return response.data as CheckoutSession;
            }));
    }

    public handleSuccessfulPayment(sessionId: string): Observable<OrderConfirmation> {
        var endpoint = `${this.baseAddress}/success`;
        var httpParams = new HttpParams();
        var params = httpParams.set('sessionId', sessionId);

        return this.httpClient.get<Response<OrderConfirmation>>(endpoint, { params }).pipe(
            map((response: Response<OrderConfirmation>) => {
                return response.data as OrderConfirmation;
            })
        );
    }
}
