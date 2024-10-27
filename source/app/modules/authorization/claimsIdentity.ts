import { Claim } from "./claims";

export class ClaimsIdentity {
    public claims: Claim[];

    public constructor(claims: Claim[]) {
        this.claims = claims;
    }

    public hasRole(role: string): boolean {
        return this.hasClaim("role", role) || this.hasClaim("roles", role);
    }

    public hasClaim(type: string, value: string): boolean {
        return this.claims.some(claim => claim.type === type && claim.value === value);
    }

    public getClaimValue(type: string): string | undefined {
        const claim = this.claims.find(claim => claim.type === type);
        return claim ? claim.value : undefined;
    }
}