import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Icons } from '../../../common/enums/icons.enum';
import { Address } from '../../../models/address.model';
import { MainLayoutComponent } from "../../../layout/main-layout/main-layout.component";
import { ProfileInformation } from '../../../payloads/responses/identity-payloads/profileInformation';
import { StorageConstants } from '../../../common/storage-constants';
import { ProfileService } from '../../../services/profile.service';
import { AddressService } from '../../../services/address.service';
import { DialogService } from '../../../services/dialog.service';
import { AddressRegistrationFormComponent } from './forms/address-registration-form/address-registration-form.component';
import { ConfirmationDialogComponent } from '../../../components/dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
    selector: 'profile-management-page',
    templateUrl: './profile-management-page.component.html',
    standalone: true,
    imports: [CommonModule, FormsModule, MainLayoutComponent],
})
export class ProfileManagementPageComponent {
    private readonly profileService: ProfileService;
    private readonly addressService: AddressService;
    private readonly dialogService: DialogService;
    private readonly changeDetector: ChangeDetectorRef;

    public icons = Icons;
    public addresses: Array<Address> = [];
    public userInformation = {  } as ProfileInformation;

    public constructor(
        profileService: ProfileService,
        addressService: AddressService,
        dialogService: DialogService,
        changeDetector: ChangeDetectorRef
    ) {
        this.profileService = profileService;
        this.addressService = addressService;
        this.dialogService = dialogService;
        this.changeDetector = changeDetector;
    }

    public ngOnInit(): void {
        this.loadProfileData();
    }

    public handleOnUserInformationChange(): void {
        this.profileService
            .updateProfileInformation(this.userInformation)
            .subscribe();
    }

    public onRegisterNewAddressClick(): void {
        var dialogRef = this.dialogService.open(AddressRegistrationFormComponent, {
            showCloseButton: true,
            closeOnBackdrop: true
        });

        dialogRef.instance.onValidSubmit.subscribe((address) => {
            this.addressService
                .registerNewAddress(address)
                .subscribe();

            this.loadProfileData();

            this.dialogService.close();
            this.changeDetector.detectChanges();
        });

        dialogRef.instance.onCancel.subscribe(() => {
            this.dialogService.close();
        });
    }

    public onDeleteAddressClick(address: Address) {
        var dialogRef = this.dialogService.open(ConfirmationDialogComponent, {
            showCloseButton: true,
            closeOnBackdrop: true,
            data: {
                title: "Deletar endereço",
                message: "Tem certeza que deseja executar esta ação?"
            }
        });

        dialogRef.instance.onConfirm.subscribe(() => {
            this.addressService
                .deleteAddress(address.id)
                .subscribe(() => {
                    this.loadProfileData();

                    this.changeDetector.detectChanges();
                    this.dialogService.close();
                });
        });

        dialogRef.instance.onCancel.subscribe(() => {
            this.dialogService.close();
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
