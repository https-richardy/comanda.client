import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_BASE_URL } from "../app.tokens";
import { SignupCredentials } from "../payloads/requests/identity-payloads/signup-credentials.payload";
import { catchError, map, Observable, of } from "rxjs";
import { Response } from "../payloads/responses/response";
import { AuthenticationStateService } from "./authentication-state.service";
import { SnackbarService } from "./snackbar.service";
import { Router } from "@angular/router";
import { SnackbarPosition } from "../common/enums/snackbar-position.enum";
import { Icons } from "../common/enums/icons.enum";
import { SnackbarType } from "../common/enums/snackbar-type.enum";

@Injectable({ providedIn: "root" })
export class SignupService {
    private readonly httpClient: HttpClient;
    private readonly baseAddress = `${inject(API_BASE_URL)}api/identity`;

    private readonly authenticationStateService: AuthenticationStateService;
    private readonly snackbar: SnackbarService;
    private readonly routerManager: Router;

    public constructor(
        httpClient: HttpClient,
        authenticationStateService: AuthenticationStateService,
        snackbar: SnackbarService,
        routerManager: Router
    ) {
        this.httpClient = httpClient;
        this.authenticationStateService = authenticationStateService;
        this.snackbar = snackbar;
        this.routerManager = routerManager;
    }

    public signup(credentials: SignupCredentials): Observable<void> {
        return this.httpClient.post<Response<null>>(`${this.baseAddress}/register`, credentials)
            .pipe(
                map((response) => {
                    if (response.statusCode === 201) {
                        this.snackbar.show("Cadastro bem-sucedido", "Seu cadastro foi realizado com sucesso!", {
                            position: SnackbarPosition.BottomRight,
                            type: SnackbarType.Info,
                            icon: Icons.Info,
                            duration: 3,
                        });

                        this.authenticationStateService.login(credentials);
                        this.routerManager.navigate(["/"]);

                        return;
                    }

                    return void 0;
                }),

                catchError((error) => {
                    if (error.status === 409) {
                        this.snackbar.show("Já existe esse usuário", "Este e-mail já foi cadastrado, por favor escolha outro e-mail.", {
                            position: SnackbarPosition.BottomRight,
                            type: SnackbarType.Warning,
                            icon: Icons.Info,
                            duration: 3,
                        });
                    }

                    else {
                        this.snackbar.show("Erro", "Ocorreu um erro inesperado.", {
                            position: SnackbarPosition.BottomRight,
                            type: SnackbarType.Error,
                            icon: Icons.Cancel,
                            duration: 3,
                        });
                    }

                    return of();
                })
            );
    }
}