import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { API_BASE_URL } from '../../app.tokens';

@Component({
    selector: 'product-card',
    standalone: true,
    imports: [ CommonModule ],
    templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
    public readonly baseAddress: string = inject(API_BASE_URL);

    @Input() public product!: Product;
    @Output() public onCartAddClick = new EventEmitter<Product>();

    public handleOnCartAddClick(): void {
        this.onCartAddClick.emit(this.product);
    }
}

