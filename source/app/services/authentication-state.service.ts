import { Injectable } from "@angular/core";
import { AuthenticationService } from "./authentication.service";
import { AuthenticationCredentials } from "../payloads/requests/identity-payloads/authenticationCredentials";
import { StorageConstants } from "../common/storage-constants";
import { SnackbarService } from "./snackbar.service";
import { SnackbarType } from "../common/enums/snackbar-type.enum";
import { SnackbarPosition } from "../common/enums/snackbar-position.enum";
import { Icons } from "../common/enums/icons.enum";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthenticationStateService {
    private readonly authenticationService: AuthenticationService;
    private readonly snackbar: SnackbarService;
    private readonly routerManager: Router;

    public constructor(
        authenticationService: AuthenticationService,
        snackbar: SnackbarService,
        routerManager: Router
    ) {
        this.authenticationService = authenticationService;
        this.snackbar = snackbar;
        this.routerManager = routerManager;
        this.snackbar = snackbar;
    }

    public login(credentials: AuthenticationCredentials): void {
        this.authenticationService.authenticate(credentials)
        .subscribe({
            next: (response) => {
                if (response.token) {
                    localStorage.setItem(StorageConstants.AuthenticationToken, response.token);
                    this.routerManager.navigate(["/"]).then(() => { });
                }
            },
            error: (error) => {
                if (error.status === 401) {
                    this.snackbar.show("Credenciais inválidas", "O e-mail ou senha está incorreto. Verifique e tente novamente.", {
                        type: SnackbarType.Warning,
                        icon: Icons.Cancel,
                        position: SnackbarPosition.BottomRight,
                        duration: 3
                    });
                }
                else {
                    console.error("Erro durante a autenticação", error);
                    this.snackbar.show("Erro no login", "Ocorreu um problema durante a autenticação", {
                        type: SnackbarType.Error,
                        icon: Icons.Cancel,
                        position: SnackbarPosition.BottomRight,
                        duration: 3
                    });
                }
            }
        });
    }

    public logout(): void {
        var authenticationToken = localStorage.getItem(StorageConstants.AuthenticationToken);

        if (authenticationToken) {
            localStorage.removeItem(StorageConstants.AuthenticationToken)
            window.location.reload();
        }
    }
}