import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderPanelItemComponent } from "./order-panel-item/order-panel-item.component";
import { FormattedOrder } from '../../payloads/responses/order-payloads/formatted-order.payload';
import { OrderService } from '../../services/order.service';
import { NotificationService } from '../../services/notification.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'order-panel',
    templateUrl: './order-panel.component.html',
    standalone: true,
    imports: [CommonModule, OrderPanelItemComponent],
})
export class OrderPanelComponent implements OnInit, OnDestroy {
    private readonly orderService: OrderService;
    private readonly notificationService: NotificationService;

    public orders: Array<FormattedOrder> = [ ];
    private notificationSubscription!: Subscription;

    public constructor(orderService: OrderService, notificatonService: NotificationService) {
        this.orderService = orderService;
        this.notificationService = notificatonService;
    }

    public ngOnInit(): void {
        this.fetchOrders();
    }

    private fetchOrders(): void {
        this.orderService
            .getOrders({ pageNumber: 1, pageSize: 40 })
            .subscribe((orders) => {
                this.orders = orders;
        });

        this.notificationSubscription = this.notificationService
            .notificationReceived$
            .subscribe(() => {
                this.fetchOrders();
            });
    }

    public ngOnDestroy(): void {
        this.notificationSubscription?.unsubscribe();
    }
}
