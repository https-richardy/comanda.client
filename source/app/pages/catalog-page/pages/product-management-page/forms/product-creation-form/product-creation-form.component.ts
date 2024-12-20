import { ProductCreationRequest } from '../../../../../../payloads/requests/product-payloads/product-creation.payload';
import { IngredientAssociationScheme } from '../../../../../../payloads/requests/product-payloads/ingredient-association-scheme.payload';

import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../../../../services/category.service';
import { ProductService } from '../../../../../../services/product.service';
import { IngredientService } from '../../../../../../services/ingredient.service';
import { Category } from '../../../../../../models/category.model';
import { Ingredient } from '../../../../../../models/ingredient.model';

@Component({
    selector: 'app-product-creation-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './product-creation-form.component.html'
})
export class ProductCreationFormComponent implements OnInit {
    private readonly formBuilder: FormBuilder;
    private readonly productService: ProductService;
    private readonly ingredientService: IngredientService;
    private readonly categoryService: CategoryService;

    public payload = {} as ProductCreationRequest;
    public form: FormGroup;

    public availableCategories: Category[] = [];
    public availableIngredients: Ingredient[] = [];

    public onValidSubmit = new EventEmitter<number>();
    public onCancel = new EventEmitter<void>();

    public constructor(
        formBuilder: FormBuilder,
        productService: ProductService,
        ingredientService: IngredientService,
        categoryService: CategoryService,
    ) {
        this.formBuilder = formBuilder;
        this.productService = productService;
        this.ingredientService = ingredientService;
        this.categoryService = categoryService;

        this.form = this.formBuilder.group({
            title: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
            description: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(120)]],
            price: [0, [Validators.required, Validators.min(0.01), Validators.max(1000)]],
            categoryId: [null, [Validators.required]],
            ingredients: this.formBuilder.array([]),
        });
    }

    public get ingredients(): FormArray {
        return this.form.get("ingredients") as FormArray;
    }

    public addIngredient(): void {
        this.ingredients.push(this.formBuilder.group({
            ingredientId: [null, Validators.required],
            standardQuantity: [1, [Validators.required, Validators.min(1)]],
            isMandatory: [false]
        }));
    }

    public removeIngredient(index: number): void {
        this.ingredients.removeAt(index);
    }

    public ngOnInit(): void {
        this.categoryService.getAllCategories().subscribe((categories) => {
            this.availableCategories = categories;
        });

        this.ingredientService.getAllIngredients().subscribe((ingredients) => {
            this.availableIngredients = ingredients;
        });
    }

    public handleSubmit(): void {
        if (this.form.valid) {

            this.payload.title = this.form.get("title")?.value;
            this.payload.description = this.form.get("description")?.value;
            this.payload.price = this.form.get("price")?.value;
            this.payload.categoryId = this.form.get("categoryId")?.value;

            var ingredients = this.form.get("ingredients")?.value;
            if (ingredients && ingredients.length > 0) {
                this.payload.ingredients = ingredients.map((ingredient: IngredientAssociationScheme) => ({
                    ingredientId: ingredient.ingredientId,
                    standardQuantity: ingredient.standardQuantity,
                    isMandatory: ingredient.isMandatory
                }));
            }

            this.productService.createProduct(this.payload).subscribe((productId) => {
                this.onValidSubmit.emit(productId);
            });
        }
    }

    public handleCancel(): void {
        this.form.reset();
        this.onCancel.emit();
    }
}
