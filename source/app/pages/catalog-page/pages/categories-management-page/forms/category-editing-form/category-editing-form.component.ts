import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../../../../services/category.service';
import { CommonModule } from '@angular/common';
import { Category } from '../../../../../../models/category.model';
import { CategoryEditingRequest } from '../../../../../../payloads/requests/categories-payloads/category-editing.paylod';

@Component({
    selector: 'app-category-editing-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './category-editing-form.component.html',
})
export class CategoryEditingFormComponent implements OnInit {
    private readonly formBuilder: FormBuilder;
    private readonly categoryService: CategoryService;

    public category!: Category;
    public form: FormGroup;
    public payload: CategoryEditingRequest = { id: 0, title: "" };

    public onValidSubmit = new EventEmitter<void>();
    public onCancel = new EventEmitter<void>();

    public constructor(formBuilder: FormBuilder, categoryService: CategoryService) {
        this.formBuilder = formBuilder;
        this.categoryService = categoryService;

        this.form = this.formBuilder.group({
            title: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
        });
    }

    public ngOnInit(): void {
        this.form.patchValue({ title: this.category.name });
    }

    public handleSubmit(): void {
        if (this.form.valid && this.form.get('title')?.value !== this.category.name) {
            this.payload.id = this.category.id;
            this.payload.title = this.form.get('title')?.value;

            this.categoryService.updateCategory(this.payload).subscribe(() => {
                this.onValidSubmit.emit();
            });
        }
    }

    public handleCancel(): void {
        this.form.reset({ title: this.category.name });
        this.onCancel.emit();
    }
}
