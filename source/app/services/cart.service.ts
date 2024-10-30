import { inject, Injectable } from '@angular/core';
import { ICartService } from './interfaces/cart.service.interface';
import { map, Observable } from 'rxjs';
import { Cart } from '../models/cart.model';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../app.tokens';
import { Response } from '../payloads/responses/response';
import { CartResponse } from '../payloads/responses/cart-payloads/cartResponse';
import { CartItem } from '../models/cart-item.model';

@Injectable({ providedIn: 'root' })
export class CartService implements ICartService {
    private readonly httpClient: HttpClient;
    private readonly baseAddress: string = `${inject(API_BASE_URL)}api/cart`;

    public constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    public getCart(): Observable<Cart> {
        return this.httpClient.get<Response<CartResponse>>(this.baseAddress).pipe(
            map((response) => {
                var cart = new Cart();

                if (response.data && Array.isArray(response.data.items)) {
                    cart.items = response.data.items.map(item => new CartItem(
                        item.id,
                        item.title,
                        item.imageUrl,
                        item.price,
                        item.quantity
                    ));
                }
    
                return cart;
            })
        );
    }
}
