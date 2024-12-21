import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationStateProvider } from "../modules/authorization/authenticationStateProvider";

@Injectable({ providedIn: "root" })
export class CustomerAccessPolicy implements CanActivate {
    private readonly authenticationStateProvider: AuthenticationStateProvider;
    private readonly routeManager: Router;

    public constructor(authenticationStateProvider: AuthenticationStateProvider, routeManager: Router) {
        this.authenticationStateProvider = authenticationStateProvider;
        this.routeManager = routeManager;
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        var authenticationState = this.authenticationStateProvider.getAuthenticationState();
        var claimsIdentity = authenticationState.user;

        if (authenticationState.isAuthenticated() && claimsIdentity?.hasRole("Customer")) {
            return true;
        }

        this.routeManager.navigate(["/"]);
        return false;
    }
}