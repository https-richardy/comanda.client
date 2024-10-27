import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProductService } from './interfaces/product.service.interface';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService implements IProductService {
    private readonly httpClient: HttpClient;
    private readonly baseAddress: string = 'https://fakestoreapi.com/products';

    public constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    public getProduct(id: number): Observable<Product> {
        return this.httpClient.get<Product>(`${this.baseAddress}/${id}`);
    }

    public getProducts(): Observable<Product[]> {
        return this.httpClient.get<Product[]>(this.baseAddress);
    }
}
