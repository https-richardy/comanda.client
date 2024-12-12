import { Component } from '@angular/core';
import { Category } from '../../../../models/category.model';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../../../services/dialog.service';
import { Icons } from '../../../../common/enums/icons.enum';
import { MainLayoutComponent } from "../../../../layout/main-layout/main-layout.component";

@Component({
    selector: 'app-categories-management-page',
    standalone: true,
    imports: [CommonModule, MainLayoutComponent],
    templateUrl: './categories-management-page.component.html'
})
export class CategoriesManagementPageComponent {
    private readonly dialogService: DialogService;

    public categories: Category[] = new Array<Category>();
    public currentCategory?: Category
    public icons = Icons;

    public constructor(dialogService: DialogService) {
        this.dialogService = dialogService;

        this.categories.push(new Category(1, "Bebidas"));
        this.categories.push(new Category(2, "Lanches"));
        this.categories.push(new Category(3, "Combos"));
    }

    public openDialog(category?: Category): void {

    }

    public handleDelete(categoryId: number): void {

    }
}
