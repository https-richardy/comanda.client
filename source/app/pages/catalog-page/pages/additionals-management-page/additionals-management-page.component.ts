import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../../../services/dialog.service';
import { Icons } from '../../../../common/enums/icons.enum';
import { ChangeDetectorRef } from '@angular/core';
import { AdditionalService } from '../../../../services/additional.service';
import { AdditionalCreationFormComponent } from './forms/additonals-creation-form/additionals-creation-form.component';
import { Additional } from '../../../../models/additional.model';
import { ConfirmationDialogComponent } from '../../../../components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { AdditionalEditingFormComponent } from './forms/additionals-editing-form/additionals-editing-form.component';
import { AdministratorDefaultLayoutComponent } from "../../../../layout/administrator-default-layout/administrator-default-layout.component";


@Component({
    selector: 'app-additionals-management-page',
    standalone: true,
    imports: [
        CommonModule,
        AdministratorDefaultLayoutComponent
    ],
    templateUrl: './additionals-management-page.component.html'
})
export class AdditionalsManagementPageComponent implements OnInit {
    private readonly dialogService: DialogService;
    private readonly additionalService: AdditionalService;
    private readonly changeDetector: ChangeDetectorRef;

    public additionals: Additional[] = new Array<Additional>();
    public icons = Icons;

    public constructor(
        dialogService: DialogService,
        additionalService: AdditionalService,
        changeDetector: ChangeDetectorRef
    ) {
        this.dialogService = dialogService;
        this.additionalService = additionalService;
        this.changeDetector = changeDetector;
    }

    public ngOnInit(): void {
        this.additionalService.getAdditionals().subscribe((additionals) => {
            this.additionals = additionals;
        });
    }

    public openDialog(additional?: Additional): void {
        let dialogRef;

        if (!additional) {
            dialogRef = this.dialogService.open(AdditionalCreationFormComponent, {
                closeOnBackdrop: true,
                closeOnEscape: true,
                showCloseButton: false
            });

            dialogRef.instance.onValidSubmit.subscribe(() => {
                this.dialogService.close();
                this.additionalService.getAdditionals().subscribe((additionals) => {
                    this.additionals = additionals;
                    this.changeDetector.detectChanges();
                });
            });

            dialogRef.instance.onCancel.subscribe(() => {
                this.dialogService.close();
            });
        }
        else {
            dialogRef = this.dialogService.open(AdditionalEditingFormComponent, {
                closeOnBackdrop: true,
                closeOnEscape: true,
                showCloseButton: false,
                data: { additional }
            });

            dialogRef.instance.onValidSubmit.subscribe(() => {
                this.dialogService.close();
                this.additionalService.getAdditionals().subscribe((additionals) => {
                    this.additionals = additionals;
                });
            });

            dialogRef.instance.onCancel.subscribe(() => {
                this.dialogService.close();
            });
        }
    }

    public handleDelete(additional: Additional) {
        var dialogRef = this.dialogService.open(ConfirmationDialogComponent, {
            closeOnBackdrop: true,
            closeOnEscape: true,
            showCloseButton: false,
            data: {
                title: 'Excluir Adicional',
                message: 'Você tem certeza que deseja excluir este adicional? Esta ação não pode ser desfeita.'
            }
        });

        dialogRef.instance.onConfirm.subscribe(() => {
            this.additionalService.deleteAdditional(additional).subscribe(() => {
                this.dialogService.close();
                this.additionalService.getAdditionals().subscribe((additionals) => {
                    this.additionals = additionals;
                });

                this.changeDetector.detectChanges();
            });
        });

        dialogRef.instance.onCancel.subscribe(() => {
            this.dialogService.close();
        });
    }
}
