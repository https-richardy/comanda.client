import { Observable } from "rxjs";
import { Cart } from "../../models/cart.model";

export interface ICartService {
    getCart(): Observable<Cart>;
}