import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-logout-confirmation-dialog',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './logout-confirmation-dialog.component.html'
})
export class LogoutConfirmationDialogComponent {
    @Output() public onClosed = new EventEmitter<void>;
    @Output() public onConfirm = new EventEmitter<void>;

    public confirmLogout(): void {
        this.onConfirm.emit();
    }

    public cancelLogout(): void {
        this.onClosed.emit();
    }
}
