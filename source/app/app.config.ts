import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export class ApplicationConfigBuilder {
    public static build(): ApplicationConfig {
        return {
            providers: [
                provideZoneChangeDetection({ eventCoalescing: true }),
                provideRouter(routes),
                provideHttpClient()
            ]
        }
    }
}