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
import { CustomerAccessPolicy } from './guards/customer.guard';
import { AccessPolicyResolver } from './resolvers/access-policy.resolver';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { ProfileManagementPageComponent } from './pages/profile/profile-management-page/profile-management-page.component';

export const routes: Routes = [
    {
        path: "",
        resolve: { target: AccessPolicyResolver },
        children: [
            { path: "", component: HomePageComponent },
            { path: "", component: CatalogPageComponent }
        ]
    },

    {
        path: "login",
        component: LoginFormComponent
    },

    {
        path: "signup",
        component: SignupFormComponent,
    },

    {
        path: "home",
        component: HomePageComponent 
    },

    {
        path: "profile",
        canActivate: [ CustomerAccessPolicy ],
        component: ProfilePageComponent
    },

    {
        path: "profile/manage",
        canActivate: [ CustomerAccessPolicy ],
        component: ProfileManagementPageComponent
    },

    {
        path: "cart",
        canActivate: [ CustomerAccessPolicy ],
        component: CartPageComponent
    },

    {
        path: "checkout/success",
        canActivate: [ CustomerAccessPolicy ],
        component: SuccessPageComponent
    },

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
    },

    {
        path: "dashboard",
        canActivate: [ AdministratorAccessPolicy ],
        component: DashboardPageComponent
    }
];
