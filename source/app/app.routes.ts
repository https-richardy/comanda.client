import { Routes } from '@angular/router';

import { ProfilePageComponent } from './pages/profile/profile-page.component';
import { HomePageComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: "", component: HomePageComponent },
    { path: "profile", component: ProfilePageComponent },
];
