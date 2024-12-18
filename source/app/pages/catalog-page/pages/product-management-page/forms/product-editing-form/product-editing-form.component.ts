import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../../../../services/category.service';
import { CommonModule } from '@angular/common';
import { CategoryEditingRequest } from '../../../../../../payloads/requests/categories-payloads/category-editing.paylod';
import { Product } from '../../../../../../models/product.model';

@Component({
    selector: 'app-product-editing-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './product-editing-form.component.html',
})
export class ProductEditingFormComponent implements OnInit {
    private readonly formBuilder: FormBuilder;
    private readonly categoryService: CategoryService;

    public product!: Product;
    public form: FormGroup;
    public payload: CategoryEditingRequest = { id: 0, title: "" };

    public onValidSubmit = new EventEmitter<void>();
    public onCancel = new EventEmitter<void>();

    public constructor(formBuilder: FormBuilder, categoryService: CategoryService) {
        this.formBuilder = formBuilder;
        this.categoryService = categoryService;

        this.form = this.formBuilder.group({
            title: ["", [Validators.required, Validators.minLength(3)]]
        });
    }

    public ngOnInit(): void {
        this.form.patchValue({ title: this.product.title });
    }

    public handleSubmit(): void {
        if (this.form.valid && this.form.get("title")?.value) {
            this.payload.id = this.product.id;
            this.payload.title = this.form.get("title")?.value;

            this.categoryService.updateCategory(this.payload).subscribe(() => {
                this.onValidSubmit.emit();
            });
        }
    }

    public handleCancel(): void {
        this.form.reset({ title: this.product.title });
        this.onCancel.emit();
    }
}
