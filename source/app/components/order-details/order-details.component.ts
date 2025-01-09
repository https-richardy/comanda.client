import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormattedOrderDetails } from '../../payloads/responses/order-payloads/formatted-order-details.payload';
import { StatusBadgeComponent } from "../order-panel/status-badge/status-badge.component";
import { OrderItemsDetailsComponent } from './order-items-details/order-items-details.component';

@Component({
    selector: 'order-details',
    templateUrl: './order-details.component.html',
    standalone: true,
    imports: [
    CommonModule,
    OrderItemsDetailsComponent,
    StatusBadgeComponent,
],
})
export class OrderDetailsComponent {
    @Input() public order!: FormattedOrderDetails;
}
