import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { API_BASE_URL } from './app.tokens';
import { AuthenticationInterceptor } from './interceptors/authentication.interceptor';
import { AuthenticationStateProvider } from './modules/authorization/authenticationStateProvider';
import { JwtAuthenticationStateProvider } from './modules/authorization/services/jwt-authentication-state-provider.service';

export class ApplicationConfigBuilder {
    public static build(): ApplicationConfig {
        return {
            providers: [
                { provide: API_BASE_URL, useValue: "http://comanda-api.somee.com/" },
                { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
                { provide: AuthenticationStateProvider, useClass: JwtAuthenticationStateProvider },

                provideZoneChangeDetection({ eventCoalescing: true }),
                provideRouter(routes),
                provideHttpClient(
                    withInterceptorsFromDi()
                ),
            ]
        }
    }
}