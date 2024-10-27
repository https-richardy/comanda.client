import { ClaimsIdentity } from './claimsIdentity';

export class AuthenticationState {
    public user: ClaimsIdentity | null;

    public constructor(user: ClaimsIdentity | null) {
        this.user = user;
    }

    public isAuthenticated(): boolean {
        return this.user !== null;
    }
}
