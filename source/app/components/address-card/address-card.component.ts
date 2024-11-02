import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Address } from '../../models/address.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'address-card',
    standalone: true,
    imports: [ CommonModule ],
    templateUrl: './address-card.component.html',
})
export class AddressCardComponent {
    @Input() public address!: Address;
    @Output() public onClick = new EventEmitter<Address>();

    public handleClick(): void {
        this.onClick.emit(this.address);
    }
}
