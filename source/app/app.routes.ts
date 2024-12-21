import { Routes } from '@angular/router';

import { ProfilePageComponent } from './pages/profile/profile-page.component';
import { HomePageComponent } from './pages/home/home.component';
import { CartPageComponent } from './pages/cart/cart-page.component';
import { SuccessPageComponent } from './pages/checkout/success/success.component';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { CategoriesManagementPageComponent } from './pages/catalog-page/pages/categories-management-page/categories-management-page.component';
import { SystemSettingsPageComponent } from './pages/system-settings-page/system-settings-page.component';
import { IngredientManagementPageComponent } from './pages/catalog-page/pages/ingredient-management-page/ingredient-management-page.component';
import { AdditionalsManagementPageComponent } from './pages/catalog-page/pages/additionals-management-page/additionals-management-page.component';
import { ProductManagementPageComponent } from './pages/catalog-page/pages/product-management-page/product-management-page.component';
import { AdministratorAccessPolicy } from './guards/administrator.guard';

export const routes: Routes = [
    { path: "", component: HomePageComponent },
    { path: "profile", component: ProfilePageComponent },
    { path: "cart", component: CartPageComponent },
    { path: "checkout/success", component: SuccessPageComponent },

    {
        path: "catalog",
        canActivate: [ AdministratorAccessPolicy ],
        component: CatalogPageComponent
    },

    {
        path: "catalog/categories",
        canActivate: [ AdministratorAccessPolicy ],
        component: CategoriesManagementPageComponent,
    },

    {
        path: "catalog/ingredients",
        canActivate: [ AdministratorAccessPolicy ],
        component: IngredientManagementPageComponent,
    },

    {
        path: "catalog/additionals",
        canActivate: [ AdministratorAccessPolicy ],
        component: AdditionalsManagementPageComponent,
    },

    {
        path: "catalog/products",
        canActivate: [ AdministratorAccessPolicy ],
        component: ProductManagementPageComponent,
    },

    {
        path: "settings",
        canActivate: [ AdministratorAccessPolicy ],
        component: SystemSettingsPageComponent,
    }
];
