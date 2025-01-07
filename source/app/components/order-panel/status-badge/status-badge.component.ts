import { Component, Input } from '@angular/core';
import { OrderStatus } from '../../../models/order-status.enum';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'status-badge',
    templateUrl: './status-badge.component.html',
    standalone: true,
    imports: [ CommonModule ]
})
export class StatusBadgeComponent {
    @Input()
    public status!: OrderStatus;

    public getStatusClass(): string {
        var classes: Record<OrderStatus, string> = {
            [OrderStatus.Pending]: "bg-yellow-200 text-yellow-800",
            [OrderStatus.Confirmed]: "bg-blue-200 text-blue-800",
            [OrderStatus.InPreparation]: "bg-indigo-200 text-indigo-800",
            [OrderStatus.Shipped]: "bg-cyan-200 text-cyan-800",
            [OrderStatus.Returned]: "bg-purple-200 text-purple-800",
            [OrderStatus.Delivered]: "bg-green-200 text-green-800",
            [OrderStatus.CancelledByCustomer]: "bg-red-200 text-red-800",
            [OrderStatus.CancelledBySystem]: "bg-gray-200 text-gray-800",
        };

        return classes[this.status];
    }

    public getStatusText(): string {
        var texts: Record<OrderStatus, string> = {
            [OrderStatus.Pending]: "pendente",
            [OrderStatus.Confirmed]: "confirmado",
            [OrderStatus.InPreparation]: "preparando",
            [OrderStatus.Shipped]: "em entrega",
            [OrderStatus.Returned]: "devolvido",
            [OrderStatus.Delivered]: "Entregue",
            [OrderStatus.CancelledByCustomer]: "cancelado p/ cliente",
            [OrderStatus.CancelledBySystem]: "cancelado p/ sistema"
        };

        return texts[this.status];
    }
}
