import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from "../../layout/navigation/navigation.component";
import { Cart } from '../../models/cart.model';
import { CartHeaderComponent } from "./components/cart-header/cart-header.component";
import { CartItemComponent } from "./components/cart-item/cart-item.component";
import { DialogService } from '../../services/dialog.service';
import { AddressSelectionDialogComponent } from '../../components/dialogs/address-selection-dialog/address-selection-dialog.component';

@Component({
    selector: 'cart-page',
    standalone: true,
    imports: [
    CommonModule,
    NavigationComponent,
    CartHeaderComponent,
    CartItemComponent
],
    templateUrl: './cart-page.component.html'
})
export class CartPageComponent implements OnInit {
    private readonly cartService: CartService;
    private readonly dialogService: DialogService;

    public items$!: Observable<CartItem[]>;
    public cart$!: Observable<Cart>;

    public constructor(cartService: CartService, dialogService: DialogService) {
        this.cartService = cartService;
        this.dialogService = dialogService;
    }

    public ngOnInit(): void {
        this.cart$ = this.cartService.getCart();
        this.items$ = this.cart$.pipe(map(cart => cart.items));
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

    public removeItem(id: number) {
        this.cartService.removeItem(id)
            .subscribe(() => {
                this.refreshCart();
            })
    }

    public openCheckoutDialog() {
        this.dialogService.open(AddressSelectionDialogComponent);
    }

    private refreshCart() {
        this.cart$ = this.cartService.getCart();
        this.items$ = this.cart$.pipe(map(cart => cart.items));
    }
}
