import { Component, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'confirmation-dialog',
    standalone: true,
    imports: [],
    templateUrl: './confirmation-dialog.component.html'
})
export class ConfirmationDialogComponent {
    @Input() title: string = 'Confirmação';
    @Input() message: string = 'Tem certeza que deseja executar esta ação?';

    public onConfirm = new EventEmitter<void>();
    public onCancel = new EventEmitter<void>();

    public handleCancel(): void {
        this.onCancel.emit();
    }

    public handleConfirm(): void {
        this.onConfirm.emit();
    }
}
