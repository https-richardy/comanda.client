import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { MainLayoutComponent } from "../../layout/main-layout/main-layout.component";
import { NavigationComponent } from "../../layout/navigation/navigation.component";
import { ProfileActionComponent } from './components/profile-action/profile-action.component';
import { ProfileActionIcons } from './components/profile-action/icons/profile-action.icons';
import { ProfileInfoComponent } from "./components/profile-info/profile-info.component";

@Component({
    selector: 'app-profile-page',
    standalone: true,
    imports: [
    CommonModule,
    MainLayoutComponent,
    NavigationComponent,
    ProfileActionComponent,
    ProfileInfoComponent
],
    templateUrl: './profile-page.component.html',
})
export class ProfilePageComponent {
    public icons = ProfileActionIcons;
    public user = {
        name: 'Richard Garcia',
        email: 'richard@garcia.com',
        status: 'Ativo'
    };
}
