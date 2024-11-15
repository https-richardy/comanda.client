import { Routes } from '@angular/router';

import { ProfilePageComponent } from './pages/profile/profile-page.component';
import { HomePageComponent } from './pages/home/home.component';
import { CartPageComponent } from './pages/cart/cart-page.component';
import { SuccessPageComponent } from './pages/checkout/success/success.component';

export const routes: Routes = [
    { path: "", component: HomePageComponent },
    { path: "profile", component: ProfilePageComponent },
    { path: "cart", component: CartPageComponent },
    { path: "checkout/success", component: SuccessPageComponent }
];
