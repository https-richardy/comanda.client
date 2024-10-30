import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { API_BASE_URL } from './app.tokens';
import { AuthenticationInterceptor } from './interceptors/authentication.interceptor';

export class ApplicationConfigBuilder {
    public static build(): ApplicationConfig {
        return {
            providers: [
                { provide: API_BASE_URL, useValue: "http://localhost:5168/" },
                { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },

                provideZoneChangeDetection({ eventCoalescing: true }),
                provideRouter(routes),
                provideHttpClient(),
            ]
        }
    }
}