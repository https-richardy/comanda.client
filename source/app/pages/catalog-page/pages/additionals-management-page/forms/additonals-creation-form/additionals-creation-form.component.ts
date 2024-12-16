import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../../../../services/category.service';
import { AdditionalService } from '../../../../../../services/additional.service';
import { AdditionalCreationRequest } from '../../../../../../payloads/requests/additionals-payloads/additional-creation.payload';
import { Category } from '../../../../../../models/category.model';

@Component({
    selector: 'app-additional-creation-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './additionals-creation-form.component.html'
})
export class AdditionalCreationFormComponent implements OnInit {
    private readonly formBuilder: FormBuilder;
    private readonly categoryService: CategoryService;
    private readonly additionalService: AdditionalService;

    public categories: Category[] = new Array<Category>();
    public payload = {  } as AdditionalCreationRequest;
    public form: FormGroup;

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
        this.categoryService.getAllCategories().subscribe((categories) => {
            this.categories = categories;
        });
    }

    public handleSubmit(): void {
        if (this.form.valid) {
            this.payload.name = this.form.get("name")?.value;
            this.payload.price = this.form.get("price")?.value;
            this.payload.categoryId = this.form.get("categoryId")?.value;

            this.additionalService
                .createAddtional(this.payload)
                .subscribe();

            this.onValidSubmit.emit();
        }
    }

    public handleCancel(): void {
        this.form.reset();
        this.onCancel.emit();
    }
}
