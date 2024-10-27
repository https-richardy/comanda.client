import { Injectable } from '@angular/core';
import { AuthenticationStateProvider } from '../authenticationStateProvider';
import { AuthenticationState } from '../authenticationState';
import { JwtTokenHandler } from './jwt-token-handler.service';
import { ClaimsIdentity } from '../claimsIdentity';

@Injectable({
    providedIn: 'root'
})
export class JwtAuthenticationStateProvider extends AuthenticationStateProvider {
    private readonly tokenHandler: JwtTokenHandler;

    public constructor(tokenHandler: JwtTokenHandler) {
        super();
        this.tokenHandler = tokenHandler;
    }

    public override getAuthenticationState(): AuthenticationState {
        var token = localStorage.getItem("authenticationToken");
        if (!token) {
            return new AuthenticationState(null);
        }

        var claims = this.tokenHandler.extractClaims(token);
        var identity = new ClaimsIdentity(claims);

        return new AuthenticationState(identity);
    }
}
