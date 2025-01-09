import { Component, Input } from '@angular/core';
import { OrderItemFormatted } from '../../../payloads/responses/order-payloads/order-item-formatted.payload';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'order-items-details',
    templateUrl: './order-items-details.component.html',
    standalone: true,
    imports: [ CommonModule ],
})
export class OrderItemsDetailsComponent {
    @Input() public items!: OrderItemFormatted[];
}
