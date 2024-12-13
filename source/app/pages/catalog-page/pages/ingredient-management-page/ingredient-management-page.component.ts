import { Component } from '@angular/core';
import { MainLayoutComponent } from "../../../../layout/main-layout/main-layout.component";
import { Ingredient } from '../../../../models/ingredient.model';
import { Icons } from '../../../../common/enums/icons.enum';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../../../services/dialog.service';
import { IngredientService } from '../../../../services/ingredient.service';

@Component({
    selector: 'app-ingredient-management-page',
    standalone: true,
    imports: [MainLayoutComponent, CommonModule],
    templateUrl: './ingredient-management-page.component.html'
})
export class IngredientManagementPageComponent {
    private readonly dialogService: DialogService;
    private readonly ingredientService: IngredientService
    public readonly icons = Icons;

    public ingredients: Ingredient[] = new Array<Ingredient>();

    public constructor(dialogService: DialogService, ingredientService: IngredientService) {
        this.dialogService = dialogService;
        this.ingredientService = ingredientService;
    }

    public openDialog(ingredient?: Ingredient): void {

    }

    public handleDelete(ingredientId: number): void {

    }
}
