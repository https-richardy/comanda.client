import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../../../models/cart-item.model';

@Component({
    selector: 'cart-item',
    standalone: true,
    imports: [],
    templateUrl: './cart-item.component.html',
})
export class CartItemComponent {
    @Input() item: CartItem = {} as CartItem;
    @Output() onIncrement = new EventEmitter<number>();
    @Output() onDecrement = new EventEmitter<number>();
    @Output() onRemove = new EventEmitter<number>();

    public handleOnIncrement(): void {
        this.onIncrement.emit(this.item.id);
    }

    public handleOnDecrement(): void {
        this.onDecrement.emit(this.item.id);
    }

    public handleOnRemove(): void {
        this.onRemove.emit(this.item.id);
    }
}
