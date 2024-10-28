import { CommonModule } from '@angular/common';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { DialogService } from '../../services/dialog.service';

@Component({
    selector: 'dialog-provider',
    standalone: true,
    imports: [CommonModule],
    providers: [DialogService],
    templateUrl: './dialog-provider.component.html',
})
export class DialogProviderComponent {
    @ViewChild('dialogContainer', { read: ViewContainerRef, static: true })
    public dialogContainer!: ViewContainerRef;
    private readonly dialogService: DialogService;

    public constructor(dialogService: DialogService) {
        this.dialogService = dialogService;
    }

    public ngAfterViewInit() {
        this.dialogService.setViewContainerRef(this.dialogContainer);
    }
}
