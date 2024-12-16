import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../../../../services/category.service';
import { CommonModule } from '@angular/common';
import { Category } from '../../../../../../models/category.model';
import { CategoryEditingRequest } from '../../../../../../payloads/requests/categories-payloads/category-editing.paylod';
import { AdditionalService } from '../../../../../../services/additional.service';
import { AdditionalEditingRequest } from '../../../../../../payloads/requests/additionals-payloads/additional-editing.payload';
import { Additional } from '../../../../../../models/additional.model';

@Component({
    selector: 'app-category-editing-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './additionals-editing-form.component.html',
})
export class AdditionalEditingFormComponent implements OnInit {
    private readonly formBuilder: FormBuilder;
    private readonly categoryService: CategoryService;
    private readonly additionalService: AdditionalService;

    public categories: Category[] = new Array<Category>();
    public payload = {  } as AdditionalEditingRequest;
    public form: FormGroup;
    public additional!: Additional;

    public onValidSubmit = new EventEmitter<void>();
    public onCancel = new EventEmitter<void>();

    public constructor(
        formBuilder: FormBuilder,
        categoryService: CategoryService,
        additionalService: AdditionalService
    ) {
        this.formBuilder = formBuilder;
        this.categoryService = categoryService;
        this.additionalService = additionalService;

        this.form = this.formBuilder.group({
            name: ["", [Validators.required, Validators.minLength(3)]],
            price: [0, [Validators.required, Validators.min(0.01)]],
            categoryId: [null, [Validators.required]]
        });
    }

    public ngOnInit(): void {
        this.form.patchValue({ name: this.additional.name });
        this.form.patchValue({ price: this.additional.price });
        this.form.patchValue({ categoryId: this.additional.category.id });

        this.categoryService.getAllCategories().subscribe((categories) => {
            this.categories = categories;
        })
    }

    public handleSubmit(): void {
        if (this.form.valid) {
            this.payload.id = this.additional.id;
            this.payload.name = this.form.get("name")?.value;
            this.payload.price = this.form.get("price")?.value;
            this.payload.categoryId = this.form.get("categoryId")?.value;

            this.additionalService.updateAdditional(this.payload).subscribe(() => {
                this.onValidSubmit.emit();
            });
        }
    }

    public handleCancel(): void {
        this.form.reset({ name: this.additional.name });
        this.form.reset({ price: this.additional.price });
        this.form.reset({ categoryId: this.additional.category.id });

        this.onCancel.emit();
    }
}
