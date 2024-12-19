import { Component, OnInit } from '@angular/core';
import { MainLayoutComponent } from "../../../layout/main-layout/main-layout.component";
import { CheckoutService } from '../../../services/checkout.service';
import { ActivatedRoute } from '@angular/router';
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
    public orderInformation = new Observable<OrderConfirmation>;

    public constructor(
        checkoutService: CheckoutService,
        cartService: CartService,
        route: ActivatedRoute
    ) {
        this.checkoutService = checkoutService;
        this.cartService = cartService;
        this.route = route;
    }

    public ngOnInit(): void {
        this.processSuccessfulPayment();
    }

    public processSuccessfulPayment(): void {
        const sessionId: string = this.route.snapshot.queryParamMap.get('sessionId') as string;
        if (sessionId) {
            this.orderInformation = this.checkoutService.handleSuccessfulPayment(sessionId)
        }
    }
}
