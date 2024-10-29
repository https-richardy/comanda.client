import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { DialogService } from '../../services/dialog.service';

@Component({
    selector: 'dialog-provider',
    standalone: true,
    imports: [CommonModule],
    providers: [DialogService],
    templateUrl: './dialog-provider.component.html',
})
export class DialogProviderComponent implements AfterViewInit {
    @ViewChild('dialogContainer', { read: ViewContainerRef })
    public dialogContainer!: ViewContainerRef;
    private readonly dialogService: DialogService;

    public constructor(dialogService: DialogService) {
        this.dialogService = dialogService;
    }

    public ngAfterViewInit() {
        this.dialogService.setViewContainerRef(this.dialogContainer);
    }
}
