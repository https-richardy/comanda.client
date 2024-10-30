import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Personalization } from '../../../payloads/requests/cart-payloads/personalization';
import { AdditionalSchema } from '../../../payloads/requests/cart-payloads/additionalSchema';
import { Product } from '../../../models/product.model';
import { CommonModule } from '@angular/common';
import { IngredientComponent } from './components/ingredient/ingredient.component';
import { Additional } from '../../../models/additional.model';
import { AdditionalService } from '../../../services/additional.service';
import { AdditionalComponent } from './components/additional/additional.component';

@Component({
    selector: 'product-customization-dialog',
    standalone: true,
    imports: [CommonModule, IngredientComponent, AdditionalComponent],
    templateUrl: './product-customization-dialog.component.html',
})
export class ProductCustomizationDialogComponent implements OnInit {
    @Input() public product!: Product;
    @Output() public onSubmit = new EventEmitter<Personalization>();

    public ingredientsIdsToRemove: number[] = [];
    public additionals: AdditionalSchema[] = [];
    public availableAdditionals: Additional[] = [];
    public totalPrice: number = 0;

    private readonly additionalService: AdditionalService;

    public constructor(additionalService: AdditionalService) {
        this.additionalService = additionalService;
    }

    public ngOnInit(): void {
        this.totalPrice = this.product.price;

        this.additionalService
            .getAdditionalsByCategory(this.product.category.id)
            .subscribe((additionals => this.availableAdditionals = additionals));
    }

    public handleRemoveIngredient(id: number): void {
        const ingredientToRemove = this.product.ingredients.find(ingredient => ingredient.id === id);

        if (ingredientToRemove) {
            if (!ingredientToRemove.isMandatory) {
                this.product.ingredients = this.product.ingredients.filter(ingredient => ingredient.id !== id);
            }

            if (this.ingredientsIdsToRemove.includes(id)) {
                this.ingredientsIdsToRemove = this.ingredientsIdsToRemove.filter(identifier => identifier !== id);
            }
            else {
                this.ingredientsIdsToRemove.push(id);
            }
        }
    }

    public handleAddAdditional(additional: Additional, quantity: number): void {
        const existingAdditional = this.additionals.find(additional => additional.additionalId === additional.additionalId);

        if (existingAdditional) {
            existingAdditional.quantity = quantity;
        }
        else {
            this.additionals.push({
                additionalId: additional.id,
                quantity
            });
        }

        this.calculateTotalPrice();
    }

    public submitPersonalization(): void {
        this.onSubmit.emit({
            ingrendientsIdsToRemove: this.ingredientsIdsToRemove,
            additionals: this.additionals
        });
    }

    private calculateTotalPrice(): void {
        const additionalTotal = this.additionals.reduce((acc, additional) => {
            const additionalData = this.availableAdditionals.find(a => a.id === additional.additionalId);
            return additionalData ? acc + (additionalData.price * additional.quantity) : acc;
        }, 0);

        this.totalPrice = this.product.price + additionalTotal;
    }
}
