import { Component, OnInit } from '@angular/core';
import { MainLayoutComponent } from "../../../layout/main-layout/main-layout.component";
import { CheckoutService } from '../../../services/checkout.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { OrderConfirmation } from '../../../payloads/responses/checkout-payloads/order-confirmation.payload';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-success',
    standalone: true,
    imports: [ MainLayoutComponent, CommonModule ],
    templateUrl: './success.component.html'
})
export class SuccessPageComponent implements OnInit {
    private readonly checkoutService: CheckoutService;
    private readonly cartService: CartService;
    private readonly route: ActivatedRoute;
    private readonly routeManager: Router;

    public orderInformation = new Observable<OrderConfirmation>;

    public constructor(
        checkoutService: CheckoutService,
        cartService: CartService,
        route: ActivatedRoute,
        routeManager: Router

    ) {
        this.checkoutService = checkoutService;
        this.cartService = cartService;
        this.route = route;
        this.routeManager = routeManager;
    }

    public ngOnInit(): void {
        const sessionId: string = this.route.snapshot.queryParamMap.get('sessionId') as string;
        if (!sessionId) {
            this.routeManager.navigate(["/"]);
            return;
        }

        this.processSuccessfulPayment(sessionId);
    }

    public processSuccessfulPayment(sessionId: string): void {
        if (sessionId) {
            this.orderInformation = this.checkoutService.handleSuccessfulPayment(sessionId);
            this.orderInformation.subscribe({
                next: () => {
                    this.cartService.clearCart();
                },
            });
        }
    }
}
