import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_BASE_URL } from "../app.tokens";
import { SignupCredentials } from "../payloads/requests/identity-payloads/signup-credentials.payload";
import { map, Observable } from "rxjs";
import { Response } from "../payloads/responses/response";
import { AuthenticationState } from "../modules/authorization/authenticationState";
import { AuthenticationStateService } from "./authentication-state.service";
import { SnackbarService } from "./snackbar.service";
import { AuthenticationCredentials } from "../payloads/requests/identity-payloads/authenticationCredentials";
import { Router } from "@angular/router";

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
                        this.snackbar.show("Cadastro bem-sucedido", "Seu cadastro foi realizado com sucesso!");
                        this.authenticationStateService.login(credentials);

                        this.routerManager.navigate(["/"]);

                        return;
                    }

                    if (response.statusCode === 400) {
                        this.snackbar.show("Cadastro falhou", "O seu cadastro falhou, por favor verifique os dados e tente novamente.");
                        return;
                    }

                    if (response.statusCode === 500) {
                        this.snackbar.show("Erro interno", "Ocorreu um erro interno no servidor, por favor tente novamente mais tarde.");
                        return;
                    }

                    return void 0;
                })
            );
    }
}