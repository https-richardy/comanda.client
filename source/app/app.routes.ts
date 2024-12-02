import { Routes } from '@angular/router';

import { ProfilePageComponent } from './pages/profile/profile-page.component';
import { HomePageComponent } from './pages/home/home.component';
import { CartPageComponent } from './pages/cart/cart-page.component';
import { SuccessPageComponent } from './pages/checkout/success/success.component';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';

export const routes: Routes = [
    /* register independent routes (standalone pages) here */
    { path: "", component: HomePageComponent },
    { path: "profile", component: ProfilePageComponent },
    { path: "cart", component: CartPageComponent },

    /* register nested routes (with children) here */
    {
        path: "checkout",
        children: [
            { path: "success", component: SuccessPageComponent }
        ]
    },
    { path: "catalog", component: CatalogPageComponent } /* TODO: add catalog child routes */
];
