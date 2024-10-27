import { Observable } from "rxjs";
import { Product } from "../../models/product.model";

export interface IProductService {
    getProducts(): Observable<Product[]>;
    getProduct(id: number): Observable<Product>;
}