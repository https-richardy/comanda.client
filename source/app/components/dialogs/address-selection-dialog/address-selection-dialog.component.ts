import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Address } from '../../../models/address.model';
import { AddressService } from '../../../services/address.service';
import { ComponentState } from '../../../common/enums/component-state.enum';
import { CommonModule } from '@angular/common';
import { AddressCardComponent } from '../../address-card/address-card.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-address-selection-dialog',
    standalone: true,
    imports: [ CommonModule, AddressCardComponent ],
    templateUrl: './address-selection-dialog.component.html'
})
export class AddressSelectionDialogComponent implements OnInit {
    private readonly addressService: AddressService
    private readonly routerManager: Router;

    public addresses: Address[] = [];
    public currentState = ComponentState.Idle;
    public componentState = ComponentState;

    @Output() public onSelect = new EventEmitter<Address>();

    public constructor(addressService: AddressService, routerManager: Router) {
        this.addressService = addressService;
        this.routerManager = routerManager;
    }

    public ngOnInit(): void {
        this.currentState = ComponentState.Busy;
        this.loadAddresses();
    }

    public goToAddressRegistration(): void {
        this.routerManager.navigate(["/profile/manage"]);
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
