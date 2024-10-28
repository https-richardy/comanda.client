import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MainLayoutComponent } from "../../layout/main-layout/main-layout.component";
import { NavigationComponent } from "../../layout/navigation/navigation.component";

@Component({
    selector: 'app-profile-page',
    standalone: true,
    imports: [
        CommonModule,
        MainLayoutComponent,
        NavigationComponent
    ],
    templateUrl: './profile-page.component.html',
})
export class ProfilePageComponent {
    public user = {
        name: 'Richard Garcia',
        email: 'richard@garcia.com',
        status: 'Ativo'
    };

    public emailNotifications = false;
    public darkMode = false;
    public twoFactorAuth = false;

    public toggleEmailNotifications() {
        this.emailNotifications = !this.emailNotifications;
    }

    public toggleDarkMode() {
        this.darkMode = !this.darkMode;
    }

    public toggleTwoFactorAuth() {
        this.twoFactorAuth = !this.twoFactorAuth;
    }
}
