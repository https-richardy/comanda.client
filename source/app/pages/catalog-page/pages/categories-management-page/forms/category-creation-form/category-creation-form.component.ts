import { Component, EventEmitter } from '@angular/core';
import { CategoryCreationRequest } from '../../../../../../payloads/requests/categories-payloads/category-creation.payload';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../../../../services/category.service';

@Component({
    selector: 'app-category-creation-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './category-creation-form.component.html'
})
export class CategoryCreationFormComponent {
    private readonly formBuilder: FormBuilder;
    private readonly categoryService: CategoryService;

    public payload: CategoryCreationRequest = { title: "" };
    public form: FormGroup;

    public onValidSubmit = new EventEmitter<void>();
    public onCancel = new EventEmitter<void>();

    public constructor(formBuilder: FormBuilder, categoryService: CategoryService) {
        this.formBuilder = formBuilder;
        this.categoryService = categoryService;

        this.form = this.formBuilder.group({
            title: ["", [Validators.required, Validators.minLength(3)]]
        });
    }

    public handleSubmit(): void {
        if (this.form.valid) {
            this.payload.title = this.form.get("title")?.value;
            this.categoryService.createCategory(this.payload).subscribe();

            this.onValidSubmit.emit();
        }
    }

    public handleCancel(): void {
        this.form.reset();
        this.onCancel.emit();
    }
}
