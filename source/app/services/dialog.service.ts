import { Injectable, ComponentRef, createComponent, Type, ApplicationRef, EnvironmentInjector } from '@angular/core';
import { DialogConfiguration } from '../components/dialog/dialog-configuration';
import { DialogComponent } from '../components/dialog/dialog.component';

@Injectable({ providedIn: 'root' })
export class DialogService {
    private readonly applicationRef: ApplicationRef;
    private readonly injector: EnvironmentInjector;

    private dialogComponentRef: ComponentRef<DialogComponent> | null = null;

    constructor(applicationRef: ApplicationRef, injector: EnvironmentInjector) {
        this.applicationRef = applicationRef;
        this.injector = injector;
    }

    public open<T>(component: Type<T>, configuration: DialogConfiguration = { showCloseButton: true, closeOnBackdrop: true }): ComponentRef<T> {
        const dialogComponentRef = createComponent(DialogComponent, {
            environmentInjector: this.injector,
            hostElement: document.createElement('div')
        });

        dialogComponentRef.instance.configuration = configuration;
        dialogComponentRef.instance.isOpen = true;

        const contentComponentRef = createComponent(component, {
            environmentInjector: this.injector,
            hostElement: document.createElement('div')
        });

        dialogComponentRef.instance.dialogContent.insert(contentComponentRef.hostView);

        this.applicationRef.attachView(dialogComponentRef.hostView);
        document.body.appendChild(dialogComponentRef.location.nativeElement);

        this.dialogComponentRef = dialogComponentRef;

        dialogComponentRef.instance.closed.subscribe(() => {
            this.close();
        });

        return contentComponentRef;
    }

    public close(): void {
        if (this.dialogComponentRef) {
            this.dialogComponentRef.destroy();
            this.dialogComponentRef = null;
        }
    }
}