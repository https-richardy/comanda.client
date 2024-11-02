import { Component, EventEmitter, Output } from '@angular/core';
import { AuthenticationCredentials } from '../../../payloads/requests/identity-payloads/authenticationCredentials';

@Component({
    selector: 'development-mode-dialog',
    standalone: true,
    imports: [],
    templateUrl: './development-mode-dialog.component.html'
})
export class DevelopmentModeDialogComponent {
    @Output() public closed = new EventEmitter<AuthenticationCredentials>();

    public handleAuth(role: 'admin' | 'customer'): void {
        if (role === "admin") {
            this.closed.emit({ email: "comanda@admin.com", password: "Ri34067294*" })
        }

        if (role === "customer") {
            this.closed.emit({ email: "john@doe.com", password: "JohnDoe1234*" })
        }
    }
}
