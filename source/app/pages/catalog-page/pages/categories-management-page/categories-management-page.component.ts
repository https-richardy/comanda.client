import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../models/category.model';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../../../services/dialog.service';
import { Icons } from '../../../../common/enums/icons.enum';
import { CategoryCreationFormComponent } from './forms/category-creation-form/category-creation-form.component';
import { CategoryService } from '../../../../services/category.service';
import { ChangeDetectorRef } from '@angular/core';
import { CategoryEditingFormComponent } from './forms/category-editing-form/category-editing-form.component';
import { ConfirmationDialogComponent } from '../../../../components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { AdministratorDefaultLayoutComponent } from "../../../../layout/administrator-default-layout/administrator-default-layout.component";

@Component({
    selector: 'app-categories-management-page',
    standalone: true,
    imports: [
        CommonModule,
        AdministratorDefaultLayoutComponent
    ],
    templateUrl: './categories-management-page.component.html'
})
export class CategoriesManagementPageComponent implements OnInit {
    private readonly dialogService: DialogService;
    private readonly categoryService: CategoryService;
    private readonly changeDetector: ChangeDetectorRef;

    public categories: Category[] = new Array<Category>();
    public currentCategory?: Category
    public icons = Icons;

    public constructor(
        dialogService: DialogService,
        categoryService: CategoryService,
        changeDetector: ChangeDetectorRef
    ) {
        this.dialogService = dialogService;
        this.categoryService = categoryService;
        this.changeDetector = changeDetector;
    }

    public ngOnInit(): void {
        this.categoryService.getAllCategories().subscribe((categories) => {
            this.categories = categories;
        });
    }

    public openDialog(category?: Category): void {
        let dialogRef;

        if (!category) {
            dialogRef = this.dialogService.open(CategoryCreationFormComponent, {
                closeOnBackdrop: true,
                closeOnEscape: true,
                showCloseButton: false
            });

            dialogRef.instance.onValidSubmit.subscribe(() => {
                this.dialogService.close();
                this.categoryService.getAllCategories().subscribe((categories) => {
                    this.categories = categories;
                    this.changeDetector.detectChanges();
                });
            });

            dialogRef.instance.onCancel.subscribe(() => {
                this.dialogService.close();
            });
        }
        else {
            dialogRef = this.dialogService.open(CategoryEditingFormComponent, {
                closeOnBackdrop: true,
                closeOnEscape: true,
                showCloseButton: false,
                data: { category }
            });

            dialogRef.instance.onValidSubmit.subscribe(() => {
                this.dialogService.close();
                this.categoryService.getAllCategories().subscribe((categories) => {
                    this.categories = categories;
                });
            });

            dialogRef.instance.onCancel.subscribe(() => {
                this.dialogService.close();
            });
        }
    }

    public handleDelete(categoryId: number): void {
        var dialogRef = this.dialogService.open(ConfirmationDialogComponent, {
            closeOnBackdrop: true,
            closeOnEscape: true,
            showCloseButton: false,
            data: {
                title: 'Excluir Categoria',
                message: 'Você tem certeza que deseja excluir esta categoria? Esta ação não pode ser desfeita.'
            }
        });

        dialogRef.instance.onConfirm.subscribe(() => {
            this.categoryService.deleteCategory(categoryId).subscribe(() => {
                this.dialogService.close();
                this.categoryService.getAllCategories().subscribe((categories) => {
                    this.categories = categories;
                });

                this.changeDetector.detectChanges();
            });
        });

        dialogRef.instance.onCancel.subscribe(() => {
            this.dialogService.close();
        });
    }
}
