import { Routes } from '@angular/router';

import { ProfilePageComponent } from './pages/profile/profile-page.component';
import { HomePageComponent } from './pages/home/home.component';
import { CartPageComponent } from './pages/cart/cart-page.component';
import { SuccessPageComponent } from './pages/checkout/success/success.component';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { CategoriesManagementPageComponent } from './pages/catalog-page/pages/categories-management-page/categories-management-page.component';
import { SystemSettingsPageComponent } from './pages/system-settings-page/system-settings-page.component';

export const routes: Routes = [
    { path: "", component: HomePageComponent },
    { path: "profile", component: ProfilePageComponent },
    { path: "cart", component: CartPageComponent },
    { path: "checkout/sucess", component: SuccessPageComponent },
    { path: "catalog", component: CatalogPageComponent },
    { path: "catalog/categories", component: CategoriesManagementPageComponent },
    { path: "settings", component: SystemSettingsPageComponent }
];
