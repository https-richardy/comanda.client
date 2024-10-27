import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { ApplicationConfigBuilder } from './app/app.config';

class Bootstrap {
    private static readonly configuration = ApplicationConfigBuilder.build();

    public static initialize(): void {
        bootstrapApplication(AppComponent, Bootstrap.configuration)
            .catch((error) => console.error(error));
    }
}

Bootstrap.initialize();