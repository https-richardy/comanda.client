import { AuthenticationState } from './authenticationState';

export abstract class AuthenticationStateProvider {
    public abstract getAuthenticationState(): AuthenticationState;
}