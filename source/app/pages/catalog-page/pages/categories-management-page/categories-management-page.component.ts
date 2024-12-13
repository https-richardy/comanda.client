import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../models/category.model';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../../../services/dialog.service';
import { Icons } from '../../../../common/enums/icons.enum';
import { MainLayoutComponent } from "../../../../layout/main-layout/main-layout.component";
import { CategoryCreationFormComponent } from './forms/category-creation-form/category-creation-form.component';
import { CategoryService } from '../../../../services/category.service';
import { ChangeDetectorRef } from '@angular/core';
import { CategoryEditingFormComponent } from './forms/category-editing-form/category-editing-form.component';

@Component({
    selector: 'app-categories-management-page',
    standalone: true,
    imports: [CommonModule, MainLayoutComponent],
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
        /* if no category is provided, a new one will be created; otherwise, it's for editing */
        if (!category) {
            var dialogRef = this.dialogService.open(CategoryCreationFormComponent, {
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
        }

        var editingDialogRef = this.dialogService.open(CategoryEditingFormComponent, {
            closeOnBackdrop: true,
            closeOnEscape: true,
            showCloseButton: false,
            data: {
                category: category
            }
        })

        editingDialogRef.instance.onValidSubmit.subscribe(() => {
            this.dialogService.close();
            this.categoryService.getAllCategories().subscribe((categories) => {
                this.categories = categories;
                this.changeDetector.detectChanges();
            })
        });
    }

    public handleDelete(categoryId: number): void {

    }
}
