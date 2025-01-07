import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OrderPanelItemComponent } from "./order-panel-item/order-panel-item.component";
import { FormattedOrder } from '../../payloads/responses/order-payloads/formatted-order.payload';
import { OrderService } from '../../services/order.service';

@Component({
    selector: 'order-panel',
    templateUrl: './order-panel.component.html',
    standalone: true,
    imports: [CommonModule, OrderPanelItemComponent],
})
export class OrderPanelComponent {
    private readonly orderService: OrderService;
    public orders: Array<FormattedOrder> = [ ];

    public constructor(orderService: OrderService) {
        this.orderService = orderService;
    }

    private fetchOrders(): void {
        this.orderService
            .getOrders({ pageNumber: 1, pageSize: 40 })
            .subscribe((orders) => {
                this.orders = orders;
        });
    }
}
