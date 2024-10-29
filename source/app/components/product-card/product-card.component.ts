import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { API_BASE_URL } from '../../app.tokens';
import { Personalization } from '../../payloads/requests/cart-payloads/personalization';
import { DialogService } from '../../services/dialog.service';
import { ProductCustomizationDialogComponent } from '../dialogs/product-customization-dialog/product-customization-dialog.component';

@Component({
    selector: 'product-card',
    standalone: true,
    imports: [ CommonModule ],
    templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
    public readonly baseAddress: string = inject(API_BASE_URL);
    private readonly dialogService: DialogService

    @Input() public product!: Product;
    @Output() public onCartAddClick = new EventEmitter<{ product: Product, personalization: Personalization }>();

    public constructor(dialogService: DialogService) {
        this.dialogService = dialogService;
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
            this.onCartAddClick.emit({ product: this.product, personalization });
        });
    }
}

