import { Component, Input } from '@angular/core';
import { FormattedOrder } from '../../../payloads/responses/order-payloads/formatted-order.payload';
import { OrderService } from '../../../services/order.service';
import { OrderStatus } from '../../../models/order-status.enum';
import { CommonModule } from '@angular/common';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';
import { Icons } from '../../../common/enums/icons.enum';

@Component({
    selector: 'order-panel-item',
    templateUrl: './order-panel-item.component.html',
    standalone: true,
    imports: [ CommonModule, StatusBadgeComponent ]
})
export class OrderPanelItemComponent {
    @Input()
    public order!: FormattedOrder;
    public icons = Icons;
    public showDropdown = false;

    private readonly orderService: OrderService;

    public constructor(orderService: OrderService) {
        this.orderService = orderService;
    }

    public updateStatus(newStatus: OrderStatus): void {
        this.order.status = newStatus;
        this.showDropdown = true;
        /* write the logic to update the information on the server */
    }

    public cancelOrder(): void {
        this.order.status = OrderStatus.CancelledBySystem;
        /* write the logic to update the information on the server */
    }

    // I think this status transition logic should be in the order service, right? 
    // Because, apparently, the components aren't designed for that... But anyway, I'm just testing my state control skills here.
    public getAllowedStatuses(): OrderStatus[] {
        var statusOrder: OrderStatus[][] = [
            [OrderStatus.Pending],
            [OrderStatus.Confirmed],
            [OrderStatus.InPreparation],
            [OrderStatus.Shipped],
            [OrderStatus.Delivered, OrderStatus.Returned],
        ];

        var currentGroupIndex = statusOrder.findIndex((group) =>
            group.includes(this.order.status)
        );

        return currentGroupIndex >= 0 && currentGroupIndex < statusOrder.length - 1
            ? statusOrder[currentGroupIndex + 1]
            : [];
    }

    public getStatusText(status: OrderStatus): string {
        const statusMap: Record<OrderStatus, string> = {
            [OrderStatus.Pending]: 'Pendente',
            [OrderStatus.Confirmed]: 'Confirmado',
            [OrderStatus.InPreparation]: 'Em Preparação',
            [OrderStatus.Shipped]: 'Enviado',
            [OrderStatus.Returned]: 'Devolvido',
            [OrderStatus.Delivered]: 'Entregue',
            [OrderStatus.CancelledByCustomer]: 'Cancelado pelo Cliente',
            [OrderStatus.CancelledBySystem]: 'Cancelado pelo Sistema',
        };

        return statusMap[status];
    }

    public toggleDropdown(): void {
        this.showDropdown = !this.showDropdown;
    }
}
