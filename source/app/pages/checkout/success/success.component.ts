import { Component, OnInit } from '@angular/core';
import { MainLayoutComponent } from "../../../layout/main-layout/main-layout.component";
import { CheckoutService } from '../../../services/checkout.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../services/cart.service';

@Component({
    selector: 'app-success',
    standalone: true,
    imports: [ MainLayoutComponent ],
    templateUrl: './success.component.html'
})
export class SuccessPageComponent implements OnInit {
    private readonly checkoutService: CheckoutService;
    private readonly cartService: CartService;
    private readonly route: ActivatedRoute;

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
            this.checkoutService.handleSuccessfulPayment(sessionId)
                .subscribe({
                    next: (response) => {
                        this.cartService.clearCart();
                    },
                    error: (error) => {
                        console.error('Error processing stripe payment:', error);
                    },
                    complete: () => {
                        console.log('Stripe payment processing complete');
                    }
                });
        }
    }
}
