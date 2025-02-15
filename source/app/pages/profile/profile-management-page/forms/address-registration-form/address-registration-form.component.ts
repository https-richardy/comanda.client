import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddressRegistrationRequest } from '../../../../../payloads/requests/address-payloads/new-address-registration.payload';

@Component({
    selector: 'address-registration-form',
    templateUrl: './address-registration-form.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule]
})
export class AddressRegistrationFormComponent {
    private readonly formBuilder: FormBuilder;
    public form!: FormGroup;

    public onValidSubmit = new EventEmitter<AddressRegistrationRequest>;
    public onCancel = new EventEmitter<void>;

    public constructor(formBuilder: FormBuilder) {
        this.formBuilder = formBuilder;

        this.form = this.formBuilder.group({
            postalCode: ["", [Validators.required, Validators.maxLength(10)]],
            number: [null],
            complement: [""],
            reference: [""],
        });
    }

    public handleSubmit(): void {
        if (this.form.valid) {
            var address: AddressRegistrationRequest = this.form.value;
            address.postalCode = address.postalCode.replace(/\D/g, "");

            this.onValidSubmit.emit(address);
        }
    }

    public handleCancel(): void {
        this.form.reset();
        this.onCancel.emit();
    }
}
