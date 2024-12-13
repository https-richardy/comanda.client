import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
export class IngredientManagementPageComponent implements OnInit {
    private readonly dialogService: DialogService;
    private readonly ingredientService: IngredientService
    private readonly changeDetector: ChangeDetectorRef;

    public icons = Icons;
    public ingredients: Ingredient[] = new Array<Ingredient>();

    public constructor(
            dialogService: DialogService,
            ingredientService: IngredientService,
            changeDetector:ChangeDetectorRef
    ) {
        this.dialogService = dialogService;
        this.ingredientService = ingredientService;
        this.changeDetector = changeDetector;
    }

    public ngOnInit(): void {
        this.ingredientService.getAllIngredients().subscribe((ingredients) =>
        {
            this.ingredients = ingredients;
        })
    }

    public openDialog(ingredient?: Ingredient): void {

    }

    public handleDelete(ingredientId: number): void {

    }
}
