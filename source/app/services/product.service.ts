import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IProductService } from './interfaces/product.service.interface';
import { Response } from '../payloads/responses/response';
import { Product } from '../models/product.model';
import { Pagination } from '../payloads/responses/pagination';
import { API_BASE_URL } from '../app.tokens';
import { ProductCreationRequest } from '../payloads/requests/product-payloads/product-creation.payload';

@Injectable({ providedIn: 'root' })
export class ProductService implements IProductService {
    private readonly httpClient: HttpClient;
    private readonly baseAddress: string = `${inject(API_BASE_URL)}api/products`;

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
        var parameters: any = {};
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

    public createProduct(product: ProductCreationRequest): Observable<number> {
        return this.httpClient.post<Response<{ productId: number }>>(this.baseAddress, product).pipe(
            map((response) => {
                if (response.data && response.isSuccess) {
                    return response.data.productId;
                }

                return 0;
            })
        );
    }

    public uploadImage(productId: number, imageFile: File): Observable<void> {
        var formData: FormData = new FormData();
        formData.append("image", imageFile, imageFile.name);

        return this.httpClient.post<void>(`${this.baseAddress}/upload-image/${productId}`,
            formData,
            {
                headers: new HttpHeaders({
                    // define 'multipart/form-data' automatically
                    // 'Content-Type': 'multipart/form-data' must not be set manually
                }),
            }
        );
    }

    public deleteProduct(product: Product): Observable<void> {
        return this.httpClient.delete<void>(`${this.baseAddress}/${product.id}`).pipe(
            map(() => void 0)
        );
    }
}
