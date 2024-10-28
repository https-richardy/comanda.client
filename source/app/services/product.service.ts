import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IProductService } from './interfaces/product.service.interface';
import { Response } from '../payloads/responses/response';
import { Product } from '../models/product.model';
import { Pagination } from '../payloads/responses/pagination';

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
        return this.httpClient.get<Response<Pagination<Product>>>(this.baseAddress).pipe(
            map((response) => {
                if (response.data && Array.isArray(response.data.results)) {
                    return response.data.results;
                }

                return [];
            })
        );
    }

    public searchProducts(searchTerm: string): Observable<Product[]> {
        var parameters: any = {  };
        if (searchTerm) {
            parameters.title = searchTerm
        }

        return this.httpClient.get<Response<Pagination<Product>>>(this.baseAddress, { params: parameters }).pipe(
            map((response) => {
                if (response.data && Array.isArray(response.data.results)) {
                    return response.data.results;
                }

                return [];
            })
        )
    }
}
