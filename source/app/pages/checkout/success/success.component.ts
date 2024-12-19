import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../../services/checkout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { OrderConfirmation } from '../../../payloads/responses/checkout-payloads/order-confirmation.payload';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CustomerDefaultLayoutComponent } from "../../../layout/customer-default-layout/customer-default-layout.component";
import { AuthorizeViewComponent } from "../../../modules/authorization/components/authorize-view/authorize-view.component";
import { AuthorizedComponent } from "../../../modules/authorization/components/authorized/authorized.component";

@Component({
    selector: 'app-success',
    templateUrl: './success.component.html',
    standalone: true,
    imports: [
        CommonModule,
        CustomerDefaultLayoutComponent,
        AuthorizeViewComponent,
        AuthorizedComponent
    ]
})
export class SuccessPageComponent implements OnInit {
    private readonly checkoutService: CheckoutService;
    private readonly cartService: CartService;
    private readonly route: ActivatedRoute;
    private readonly routeManager: Router;

    public orderInformation = {  } as OrderConfirmation;

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
            this.checkoutService
                .handleSuccessfulPayment(sessionId)
                .subscribe((orderConfirmation) => {
                    this.orderInformation = orderConfirmation;
                    this.cartService.clearCart();
                });
        }
    }
}
