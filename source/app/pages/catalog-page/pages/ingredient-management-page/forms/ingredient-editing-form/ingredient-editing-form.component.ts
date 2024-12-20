import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IngredientService } from '../../../../../../services/ingredient.service';
import { IngredientEditingRequest } from '../../../../../../payloads/requests/ingredients-payloads/ingredient-editing.payload';
import { Ingredient } from '../../../../../../models/ingredient.model';

@Component({
    selector: 'app-ingredient-editing-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './ingredient-editing-form.component.html',
})
export class IngredientEditingFormComponent implements OnInit {
    private readonly formBuilder: FormBuilder;
    private readonly ingredientService: IngredientService;

    public ingredient!: Ingredient;
    public form: FormGroup;
    public payload: IngredientEditingRequest = { id: 0, name: "" };

    public onValidSubmit = new EventEmitter<void>();
    public onCancel = new EventEmitter<void>();

    public constructor(formBuilder: FormBuilder, ingredientService: IngredientService) {
        this.formBuilder = formBuilder;
        this.ingredientService = ingredientService;

        this.form = this.formBuilder.group({
            name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
        });
    }

    public ngOnInit(): void {
        this.form.patchValue({ name: this.ingredient.name });
    }

    public handleSubmit(): void {
        if (this.form.valid && this.form.get("name")?.value !== this.ingredient.name) {
            this.payload.id = this.ingredient.id;
            this.payload.name = this.form.get("name")?.value;

            this.ingredientService.updateIngredient(this.payload).subscribe(() => {
                this.onValidSubmit.emit();
            });
        }
    }

    public handleCancel(): void {
        this.form.reset({ name: this.ingredient.name });
        this.onCancel.emit();
    }
}
