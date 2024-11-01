import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from "../../layout/navigation/navigation.component";

@Component({
    selector: 'cart-page',
    standalone: true,
    imports: [CommonModule, NavigationComponent],
    templateUrl: './cart-page.component.html'
})
export class CartPageComponent implements OnInit {
    private readonly cartService: CartService;
    public items$!: Observable<CartItem[]>;

    public constructor(cartService: CartService) {
        this.cartService = cartService;
    }

    public ngOnInit(): void {
        this.items$ = this.cartService.getCart().pipe(
            map(cart => cart.items)
          );
    }

    public incrementItemQuantity(itemId: number) {
        this.cartService.incrementItemQuantity(itemId)
            .subscribe(() => {
                this.refreshCart();
            });
    }

    public decrementItemQuantity(itemId: number) {
        this.cartService.decrementItemQuantity(itemId)
            .subscribe(() => {
                this.refreshCart();
            })
    }

    public updateQuantity(id: number, change: number) {

    }

    public removeItem(id: number) {

    }

    public getTotal(items: CartItem[]): number {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    private refreshCart() {
        this.items$ = this.cartService
            .getCart()
            .pipe(
                map(cart => cart.items)
            );
    }
}
