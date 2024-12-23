import { Injectable } from "@angular/core";
import { Resolve, Router } from "@angular/router";
import { AuthenticationStateProvider } from "../modules/authorization/authenticationStateProvider";

@Injectable({ providedIn: 'root' })
export class AccessPolicyResolver implements Resolve<void> {
    private readonly authenticationStateProvider: AuthenticationStateProvider;
    private readonly routeManager: Router;

    public constructor(authenticationStateProvider: AuthenticationStateProvider, routeManager: Router) {
        this.authenticationStateProvider = authenticationStateProvider;
        this.routeManager = routeManager;
    }

    public resolve(): void {
        var authenticationState = this.authenticationStateProvider.getAuthenticationState();
        var claimsIdentity = authenticationState.user;

        if (authenticationState.isAuthenticated() && claimsIdentity?.hasRole("Administrator")) {
            this.routeManager.navigate(["/dashboard"]);
        }

        if (authenticationState.isAuthenticated() && claimsIdentity?.hasRole("Customer")) {
            this.routeManager.navigate(["/home"]);
        }

        if (authenticationState.isAuthenticated() === false) {
            this.routeManager.navigate(["/login"]);
        }
    }
}