import { Component, Input } from '@angular/core';
import { FormattedOrder } from '../../../payloads/responses/order-payloads/formatted-order.payload';
import { OrderService } from '../../../services/order.service';
import { OrderStatus } from '../../../models/order-status.enum';
import { CommonModule } from '@angular/common';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';

@Component({
    selector: 'order-panel-item',
    templateUrl: './order-panel-item.component.html',
    standalone: true,
    imports: [ CommonModule, StatusBadgeComponent ]
})
export class OrderPanelItemComponent {
    @Input()
    public order!: FormattedOrder;
    private readonly orderService: OrderService;

    public constructor(orderService: OrderService) {
        this.orderService = orderService;
    }

    public updateStatus(newStatus: OrderStatus): void {
        this.order.status = newStatus;
        /* write the logic to update the information on the server */
    }

    public cancelOrder(): void {
        this.order.status = OrderStatus.CancelledBySystem;
        /* write the logic to update the information on the server */
    }
}
