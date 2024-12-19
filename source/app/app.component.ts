import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DialogService } from './services/dialog.service';
import { DevelopmentModeDialogComponent } from './components/dialogs/development-mode-dialog/development-mode-dialog.component';
import { AuthenticationCredentials } from './payloads/requests/identity-payloads/authenticationCredentials';
import { API_BASE_URL } from './app.tokens';
import { Response } from './payloads/responses/response';
import { AuthenticationResponse } from './payloads/responses/identity-payloads/authenticationResponse';
import { StorageConstants } from './common/storage-constants';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [ RouterOutlet ],
    templateUrl: './app.component.html'
})
export class AppComponent {
    private readonly httpClient: HttpClient;
    private readonly dialogService: DialogService;

    private readonly baseAddress = `${inject(API_BASE_URL)}api/identity`

    public constructor(httpClient: HttpClient, dialogService: DialogService) {
        this.httpClient = httpClient;
        this.dialogService = dialogService;
    }

    public ngOnInit(): void {
        const authenticated = localStorage.getItem(StorageConstants.AuthenticationToken);

        if (!authenticated) {
            const dialogRef = this.dialogService.open(DevelopmentModeDialogComponent);

            dialogRef.instance.closed.subscribe((credentials: AuthenticationCredentials) => {
                if (credentials) {
                    this.dialogService.close();
                    this.httpClient
                        .post<Response<AuthenticationResponse>>(`${this.baseAddress}/authenticate`, credentials)
                        .subscribe((response) => {
                            if (response.isSuccess && response.data) {
                                localStorage.setItem(StorageConstants.AuthenticationToken, response.data.token);
                                window.location.reload();
                            }
                        });
                }
            });
        }
    }
}
