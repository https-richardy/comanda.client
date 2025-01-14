import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Icons } from '../../../common/enums/icons.enum';
import { Address } from '../../../models/address.model';
import { MainLayoutComponent } from "../../../layout/main-layout/main-layout.component";
import { ProfileInformation } from '../../../payloads/responses/identity-payloads/profileInformation';
import { StorageConstants } from '../../../common/storage-constants';
import { ProfileService } from '../../../services/profile.service';
import { AddressService } from '../../../services/address.service';

@Component({
    selector: 'profile-management-page',
    templateUrl: './profile-management-page.component.html',
    standalone: true,
    imports: [CommonModule, FormsModule, MainLayoutComponent],
})
export class ProfileManagementPageComponent {
    private readonly profileService: ProfileService;
    private readonly addressService: AddressService;

    public icons = Icons;
    public addresses: Array<Address> = [];
    public userInformation = {  } as ProfileInformation;

    public constructor(profileService: ProfileService, addressService: AddressService) {
        this.profileService = profileService;
        this.addressService = addressService;
    }

    public ngOnInit(): void {
        this.loadProfileData();
    }

    public handleOnUserInformationChange(): void {
        this.profileService.updateProfileInformation(this.userInformation).subscribe({
            next: () => {
                console.log('Perfil atualizado com sucesso.');
            },
            error: (error) => {
                console.error('Erro ao atualizar o perfil:', error);
            },
        });
    }

    private loadProfileData(): void {
        var storedProfileInformation = localStorage.getItem(StorageConstants.ProfileInformation);
        if (storedProfileInformation) {
            var profileInformation = JSON.parse(storedProfileInformation);

            this.userInformation.name = profileInformation.name || "";
            this.userInformation.email = profileInformation.email || "";
        }

        this.addressService
            .getAddresses()
            .subscribe((data) => {
                this.addresses = data;
        });
    }
}
