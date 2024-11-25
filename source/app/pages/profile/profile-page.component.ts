import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { NavigationComponent } from "../../layout/navigation/navigation.component";
import { ProfileActionComponent } from './components/profile-action/profile-action.component';
import { ProfileActionIcons } from './components/profile-action/profile-action.icons';
import { ProfileInfoComponent } from "./components/profile-info/profile-info.component";
import { ProfileInformation } from '../../payloads/responses/identity-payloads/profileInformation';
import { ProfileService } from '../../services/profile.service';
import { DialogService } from '../../services/dialog.service';
import { LogoutConfirmationDialogComponent } from '../../components/dialogs/logout-confirmation-dialog/logout-confirmation-dialog.component';

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
    private readonly dialogService: DialogService;

    public icons = ProfileActionIcons;
    public user: ProfileInformation = {  } as ProfileInformation;

    public constructor(profileService: ProfileService, dialogService: DialogService) {
        this.profileService = profileService;
        this.dialogService = dialogService;
    }

    public ngOnInit(): void {
        const storedUserInformation = localStorage.getItem("profile.information");
        if (storedUserInformation) {
            this.user = JSON.parse(storedUserInformation);
        }

        else {
            this.profileService.getProfileInformation()
                .subscribe((user) => {
                    this.user = user;
                    localStorage.setItem("profile.information", JSON.stringify(user));
                });
        }
    }

    public logout(): void {
        const dialogRef = this.dialogService.open(LogoutConfirmationDialogComponent);
        dialogRef.instance.onConfirm.subscribe(() => {
            this.dialogService.close();

            localStorage.removeItem("authenticationToken");
            localStorage.removeItem("profile.information");

            window.location.reload();
        });

        dialogRef.instance.onClosed.subscribe(() => {
            this.dialogService.close();
        });
    }
}
