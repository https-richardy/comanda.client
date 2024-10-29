import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Additional } from '../../../../../models/additional.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'additional',
    standalone: true,
    imports: [ CommonModule ],
    templateUrl: './additional.component.html'
})
export class AdditionalComponent {
    @Input() public additional!: Additional;
    @Output() public quantityChange = new EventEmitter<number>();

    public quantity: number = 0;

    public increaseQuantity(): void {
        this.quantity++;
        this.quantityChange.emit(this.quantity);
    }

    public decreaseQuantity(): void {
        if (this.quantity > 0) {
            this.quantity--;

            this.quantityChange.emit(this.quantity);
        }
    }
}
