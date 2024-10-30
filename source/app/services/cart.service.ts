import { inject, Injectable } from '@angular/core';
import { ICartService } from './interfaces/cart.service.interface';
import { BehaviorSubject, catchError, map, Observable, of, switchMap } from 'rxjs';
import { Cart } from '../models/cart.model';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../app.tokens';
import { Response } from '../payloads/responses/response';
import { CartResponse } from '../payloads/responses/cart-payloads/cartResponse';
import { CartItem } from '../models/cart-item.model';
import { InsertProductIntoCartRequest } from '../payloads/requests/cart-payloads/insertProductIntoCartRequest';

@Injectable({ providedIn: 'root' })
export class CartService implements ICartService {
    private readonly httpClient: HttpClient;
    private readonly baseAddress: string = `${inject(API_BASE_URL)}api/cart`;
    private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(new Cart());

    public constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
        this.loadCart();
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

    public addItem(item: InsertProductIntoCartRequest): Observable<Cart> {
        return this.httpClient.post<Response<undefined>>(`${this.baseAddress}/items`, item).pipe(
            switchMap((response) => {
                if (response.isSuccess) {
                    this.loadCart();
                    return of(this.cartSubject.value);
                }

                else {
                    return of(new Cart());
                }
            }),
            catchError((error) => {
                console.error('Erro ao adicionar item ao carrinho:', error);
                return of(new Cart());
            })
        );
    }

    public getCartObservable(): Observable<Cart> {
        return this.cartSubject.asObservable();
    }

    private loadCart() {
        this.getCart().subscribe(cart => {
            this.cartSubject.next(cart);
        });
    }
}
