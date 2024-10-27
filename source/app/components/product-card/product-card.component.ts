import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
    selector: 'product-card',
    standalone: true,
    imports: [ CommonModule ],
    templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
    @Input() public product!: Product;
    @Output() public onCartAddClick = new EventEmitter<Product>();

    public handleOnCartAddClick(): void {
        this.onCartAddClick.emit(this.product);
    }
}

