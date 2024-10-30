import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'cart-navigation-item',
    standalone: true,
    imports: [ CommonModule, RouterModule ],
    templateUrl: './cart-navigation-item.component.html',
})
export class CartNavigationItemComponent implements OnInit {
    public route: string = '/cart';
    public badgeCount: number = 0;

    private readonly cartService: CartService;

    public constructor(cartService: CartService) {
        this.cartService = cartService;
    }

    public ngOnInit(): void {
        this.cartService.getCartObservable().subscribe(cart => {
            this.badgeCount = cart.items.length;
        });
    }
}
