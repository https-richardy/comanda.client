import { Component, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IngredientCreationRequest } from '../../../../../../payloads/requests/ingredients-payloads/ingredient-creation.payload';
import { IngredientService } from '../../../../../../services/ingredient.service';

@Component({
    selector: 'ingredient-creation-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './ingredient-creation-form.component.html'
})
export class IngredientCreationFormComponent {
    private readonly formBuilder: FormBuilder;
    private readonly ingredientService: IngredientService;

    public payload: IngredientCreationRequest = { name: "" };
    public form: FormGroup;

    public onValidSubmit = new EventEmitter<void>();
    public onCancel = new EventEmitter<void>();

    public constructor(formBuilder: FormBuilder, ingredientService: IngredientService) {
        this.formBuilder = formBuilder;
        this.ingredientService = ingredientService;

        this.form = this.formBuilder.group({
            name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        });
    }

    public handleSubmit(): void {
        if (this.form.valid) {
            this.payload.name = this.form.get("name")?.value;
            this.ingredientService.createIngredient(this.payload).subscribe();

            this.onValidSubmit.emit();
        }
    }

    public handleCancel(): void {
        this.form.reset();
        this.onCancel.emit();
    }
}
