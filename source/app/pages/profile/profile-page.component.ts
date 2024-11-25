import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { NavigationComponent } from "../../layout/navigation/navigation.component";
import { ProfileActionComponent } from './components/profile-action/profile-action.component';
import { ProfileActionIcons } from './components/profile-action/profile-action.icons';
import { ProfileInfoComponent } from "./components/profile-info/profile-info.component";
import { ProfileInformation } from '../../payloads/responses/identity-payloads/profileInformation';
import { ProfileService } from '../../services/profile.service';

@Component({
    selector: 'app-profile-page',
    standalone: true,
    imports: [
    CommonModule,
    NavigationComponent,
    ProfileActionComponent,
    ProfileInfoComponent
],
    templateUrl: './profile-page.component.html',
})
export class ProfilePageComponent implements OnInit {
    private readonly profileService: ProfileService;

    public icons = ProfileActionIcons;
    public user: ProfileInformation = {  } as ProfileInformation;

    public constructor(profileService: ProfileService) {
        this.profileService = profileService;
    }

    public ngOnInit(): void {
        const storedUser = localStorage.getItem("profile.information");
        if (storedUser) {
            this.user = JSON.parse(storedUser);
        }

        else {
            this.profileService.getProfileInformation()
                .subscribe((user) => {
                    this.user = user;
                    localStorage.setItem("profile.information", JSON.stringify(user));
                });
        }
    }
}
