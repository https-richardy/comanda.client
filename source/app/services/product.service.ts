import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IProductService } from './interfaces/product.service.interface';
import { Response } from '../payloads/responses/response';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService implements IProductService {
    private readonly httpClient: HttpClient;
    private readonly baseAddress: string = "http://localhost:5168/api/products";

    public constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    public getProduct(id: number): Observable<Product> {
        return this.httpClient.get<Product>(`${this.baseAddress}/${id}`);
    }

    public getProducts(): Observable<Product[]> {
        var response = this.httpClient.get<Response<Product[]>>(this.baseAddress).pipe(
            map((response) => response.data || [])
        );

        return response;
    }
}
