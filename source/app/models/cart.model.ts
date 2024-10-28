import { CartItem } from "./cart-item.model";

export class Cart {
    public items: CartItem[] = [];

    public get total(): number {
        return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
    }
}