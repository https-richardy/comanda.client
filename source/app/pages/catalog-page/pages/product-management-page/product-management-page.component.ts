import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../../../services/dialog.service';
import { Icons } from '../../../../common/enums/icons.enum';
import { ProductService } from '../../../../services/product.service';
import { ProductCreationFormComponent } from './forms/product-creation-form/product-creation-form.component';
import { ProductEditingFormComponent } from './forms/product-editing-form/product-editing-form.component';
import { ConfirmationDialogComponent } from '../../../../components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { Product } from '../../../../models/product.model';
import { ProductImageUploadFormComponent } from './forms/product-image-upload-form/product-image-upload-form.component';
import { AdministratorDefaultLayoutComponent } from "../../../../layout/administrator-default-layout/administrator-default-layout.component";
import { AuthorizeViewComponent } from "../../../../modules/authorization/components/authorize-view/authorize-view.component";
import { AuthorizedComponent } from "../../../../modules/authorization/components/authorized/authorized.component";

@Component({
    selector: 'app-product-management-page',
    standalone: true,
    imports: [
        CommonModule,
        AdministratorDefaultLayoutComponent,
        AuthorizeViewComponent,
        AuthorizedComponent
],
    templateUrl: './product-management-page.component.html'
})
export class ProductManagementPageComponent implements OnInit {
    private readonly dialogService: DialogService;
    private readonly productService: ProductService;
    private readonly changeDetector: ChangeDetectorRef;

    public products: Product[] = new Array<Product>();
    public icons = Icons;

    public constructor(
        dialogService: DialogService,
        productService: ProductService,
        changeDetector: ChangeDetectorRef
    ) {
        this.dialogService = dialogService;
        this.productService = productService;
        this.changeDetector = changeDetector;
    }

    public ngOnInit(): void {
        this.productService.getProducts().subscribe((products) => {
            this.products = products;
        });
    }

    public openDialog(product?: Product): void {
        let dialogRef;

        if (!product) {
            dialogRef = this.dialogService.open(ProductCreationFormComponent, {
                closeOnBackdrop: true,
                closeOnEscape: true,
                showCloseButton: false
            });

            dialogRef.instance.onValidSubmit.subscribe((productId) => {
                this.dialogService.close();
                dialogRef = this.dialogService.open(ProductImageUploadFormComponent, {
                    closeOnBackdrop: true,
                    closeOnEscape: true,
                    showCloseButton: false,
                    data: { productId: productId }
                });

                dialogRef.instance.onValidSubmit.subscribe(() => {
                    this.dialogService.close();
                    this.productService.getProducts().subscribe((products) => {
                        this.products = products;
                        this.changeDetector.detectChanges();
                    });
                });

            });

            dialogRef.instance.onCancel.subscribe(() => {
                this.dialogService.close();
            });
        }
        else {
            dialogRef = this.dialogService.open(ProductEditingFormComponent, {
                closeOnBackdrop: true,
                closeOnEscape: true,
                showCloseButton: false,
                data: { product }
            });

            dialogRef.instance.onValidSubmit.subscribe(() => {
                this.dialogService.close();
                this.productService.getProducts().subscribe((products) => {
                    this.products = products;
                    this.changeDetector.detectChanges();
                });
            });

            dialogRef.instance.onCancel.subscribe(() => {
                this.dialogService.close();
            });
        }
    }

    public handleDelete(product: Product): void {
        var dialogRef = this.dialogService.open(ConfirmationDialogComponent, {
            closeOnBackdrop: true,
            closeOnEscape: true,
            showCloseButton: false,
            data: {
                title: `Excluir ${product.title}?`,
                message: 'Você tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.'
            }
        });

        dialogRef.instance.onConfirm.subscribe(() => {
            this.productService.deleteProduct(product).subscribe(() => {
                this.productService.getProducts().subscribe((products) => {
                    this.products = products;
                    this.changeDetector.detectChanges();
                });
            });

            this.dialogService.close();
        });

        dialogRef.instance.onCancel.subscribe(() => {
            this.dialogService.close();
        });
    }
}
