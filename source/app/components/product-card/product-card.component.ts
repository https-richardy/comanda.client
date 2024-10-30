import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { API_BASE_URL } from '../../app.tokens';
import { Personalization } from '../../payloads/requests/cart-payloads/personalization';
import { DialogService } from '../../services/dialog.service';
import { ProductCustomizationDialogComponent } from '../dialogs/product-customization-dialog/product-customization-dialog.component';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'product-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
    public readonly baseAddress: string = inject(API_BASE_URL);
    private readonly dialogService: DialogService
    private readonly cartService: CartService;

    @Input() public product!: Product;
    @Output() public onCartAddClick = new EventEmitter<{ product: Product, personalization: Personalization }>();

    public constructor(dialogService: DialogService, cartService: CartService) {
        this.dialogService = dialogService;
        this.cartService = cartService;
    }

    public handleOnCartAddClick(): void {
        const dialogRef = this.dialogService.open(ProductCustomizationDialogComponent, {
            data: {
                product: this.product
            },
            showCloseButton: true,
            closeOnBackdrop: true
        });

        dialogRef.instance.onSubmit.subscribe((personalization) => {
            this.dialogService.close();
            this.cartService
                .addItem({
                    productId: this.product.id,
                    quantity: 1,
                    ingredientsIdsToRemove: personalization.ingrendientsIdsToRemove,
                    additionals: personalization.additionals
                })
                .subscribe(cart => {
                    if (cart) {
                        console.log('Carrinho atualizado:', cart);
                        this.onCartAddClick.emit({ product: this.product, personalization });
                    } else {
                        console.error('Erro ao atualizar o carrinho.');
                    }
                }, error => {
                    console.error('Erro ao adicionar item ao carrinho:', error);
                });
        });
    }
}

