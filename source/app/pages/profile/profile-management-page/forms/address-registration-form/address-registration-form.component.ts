import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Address } from '../../../../../models/address.model';

@Component({
    selector: 'address-registration-form',
    templateUrl: './address-registration-form.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule]
})
export class AddressRegistrationFormComponent {
    private readonly formBuilder: FormBuilder;
    public form!: FormGroup;

    public onValidSubmit = new EventEmitter<Address>;
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
            var address: Address = this.form.value;
            this.onValidSubmit.emit(address);
        }
    }

    public handleCancel(): void {
        this.form.reset();
        this.onCancel.emit();
    }
}
