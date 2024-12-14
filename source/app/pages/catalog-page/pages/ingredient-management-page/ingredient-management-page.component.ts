import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MainLayoutComponent } from "../../../../layout/main-layout/main-layout.component";
import { Ingredient } from '../../../../models/ingredient.model';
import { Icons } from '../../../../common/enums/icons.enum';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../../../services/dialog.service';
import { IngredientService } from '../../../../services/ingredient.service';
import { IngredientCreationFormComponent } from './forms/ingredient-creation-form/ingredient-creation-form.component';
import { IngredientEditingFormComponent } from './forms/ingredient-editing-form/ingredient-editing-form.component';
import { ConfirmationDialogComponent } from '../../../../components/dialogs/confirmation-dialog/confirmation-dialog.component';

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
        changeDetector: ChangeDetectorRef
    ) {
        this.dialogService = dialogService;
        this.ingredientService = ingredientService;
        this.changeDetector = changeDetector;
    }

    public ngOnInit(): void {
        this.ingredientService.getAllIngredients().subscribe((ingredients) => {
            this.ingredients = ingredients;
        })
    }

    public openDialog(ingredient?: Ingredient): void {
        let dialogRef;

        if (!ingredient) {
            dialogRef = this.dialogService.open(IngredientCreationFormComponent, {
                closeOnBackdrop: true,
                closeOnEscape: true,
                showCloseButton: false
            });

            dialogRef.instance.onValidSubmit.subscribe(() => {
                this.ingredientService.getAllIngredients().subscribe((ingredients) => {
                    this.ingredients = ingredients;

                    this.dialogService.close();

                    this.changeDetector.reattach();
                    this.changeDetector.detectChanges();
                });
            });

            dialogRef.instance.onCancel.subscribe(() => {
                this.dialogService.close();
            });
        }
        else {
            dialogRef = this.dialogService.open(IngredientEditingFormComponent, {
                closeOnBackdrop: true,
                closeOnEscape: true,
                showCloseButton: false,
                data: { ingredient }
            });

            dialogRef.instance.onValidSubmit.subscribe(() => {
                this.dialogService.close();
                this.ingredientService.getAllIngredients().subscribe((ingredients) => {
                    this.ingredients = ingredients;
                });
            });

            dialogRef.instance.onCancel.subscribe(() => {
                this.dialogService.close();
            });
        }
    }

    public handleDelete(ingredientId: number): void {
        var dialogRef = this.dialogService.open(ConfirmationDialogComponent, {
            closeOnBackdrop: true,
            closeOnEscape: true,
            showCloseButton: false,
            data: {
                title: "Excluir Ingrediente",
                message: "Você tem certeza que deseja excluir este ingrediente? Esta ação não pode ser desfeita."
            }
        });

        dialogRef.instance.onConfirm.subscribe(() => {
            this.ingredientService.deleteIngredient(ingredientId).subscribe(() => {
                this.dialogService.close();
                this.ingredientService.getAllIngredients().subscribe((ingredients) => {
                    this.ingredients = ingredients;
                });

                this.changeDetector.detectChanges();
            });
        });

        dialogRef.instance.onCancel.subscribe(() => {
            this.dialogService.close();
        });
    }
}
