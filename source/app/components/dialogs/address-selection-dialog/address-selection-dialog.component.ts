import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Address } from '../../../models/address.model';
import { AddressService } from '../../../services/address.service';
import { ComponentState } from '../../../common/enums/component-state.enum';
import { CommonModule } from '@angular/common';
import { AddressCardComponent } from '../../address-card/address-card.component';

@Component({
    selector: 'app-address-selection-dialog',
    standalone: true,
    imports: [ CommonModule, AddressCardComponent ],
    templateUrl: './address-selection-dialog.component.html'
})
export class AddressSelectionDialogComponent implements OnInit {
    private readonly addressService: AddressService

    public addresses: Address[] = [];
    public currentState = ComponentState.Idle;
    public componentState = ComponentState;

    @Output() public onSelect = new EventEmitter<Address>();

    public constructor(addressService: AddressService) {
        this.addressService = addressService;
    }

    public ngOnInit(): void {
        this.currentState = ComponentState.Busy;
        this.loadAddresses();
    }

    public goToAddressRegistration(): void {
        // TODO: implement address registration
    }

    public handleSelection(address: Address): void {
        this.onSelect.emit(address);
    }

    private loadAddresses(): void {
        this.addressService
            .getAddresses()
            .subscribe({
                next: (addresses) => {
                    this.addresses = addresses;
                    this.currentState = ComponentState.Idle;
                },
                error: () => {
                    this.currentState = ComponentState.Idle;
                    console.error('Ocorreu um erro ao buscar os endereços.');
                }
            });
    }
}
