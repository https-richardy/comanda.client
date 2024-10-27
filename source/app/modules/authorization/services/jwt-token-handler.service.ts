import { Injectable } from '@angular/core';
import { Claim } from '../claims';

@Injectable({ providedIn: 'root' })
export class JwtTokenHandler {
    public extractClaims(token: string): Claim[] {
        if (!token) {
            return [];
        }

        try {
            const payload = this.getPayloadFromToken(token);
            return this.parseClaims(payload);
        } catch (error) {
            console.error('Invalid token format', error);
            return [];
        }
    }

    private getPayloadFromToken(token: string): any {
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('JWT must have 3 parts');
        }

        const payloadBase64 = parts[1];
        const payloadJson = atob(this.base64UrlDecode(payloadBase64));

        return JSON.parse(payloadJson);
    }

    private base64UrlDecode(base64Url: string): string {
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return base64;
    }

    private parseClaims(payload: any): Claim[] {
        const claims: Claim[] = [];

        for (const key in payload) {
            if (Object.prototype.hasOwnProperty.call(payload, key)) {
                const value = payload[key];
                claims.push(new Claim(key, value.toString()));
            }
        }

        return claims;
    }
}
