import { ApplicationRef, ComponentRef, EmbeddedViewRef, Injectable, Injector, Type, ViewContainerRef } from "@angular/core";
import { DialogComponent } from "../components/dialog/dialog.component";
import { DialogConfiguration } from "../components/dialog/dialog.config";
import { DialogRef } from "../components/dialog/dialog-ref";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class DialogService {
    private dialogComponentRef!: ComponentRef<any>;
    private closeSubject = new BehaviorSubject<any>(null);

    private readonly appRef: ApplicationRef;
    private readonly injector: Injector;
    private viewContainerRef!: ViewContainerRef;

    public constructor(appRef: ApplicationRef, injector: Injector) {
        this.appRef = appRef;
        this.injector = injector;
    }

    public open(component: Type<any>, config: DialogConfiguration = {}): DialogRef {
        const defaults: DialogConfiguration = {
            width: 'md',
            maxWidth: '2xl',
            position: 'center',
            closeOnEscape: true,
            closeOnBackdrop: true,
            showCloseButton: true
        };

        const mergedConfig = { ...defaults, ...config };

        const componentRef = this.createComponent(DialogComponent);
        this.dialogComponentRef = componentRef;

        const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        document.body.appendChild(domElem);

        const instance = componentRef.instance;

        instance.childComponent = component;
        instance.config = mergedConfig;
        instance.close = (result?: any) => this.close(result);

        if (mergedConfig.closeOnEscape) {
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                    this.close();
                }
            });
        }

        return {
            close: (result?: any) => this.close(result),
            afterClosed: () => this.closeSubject.asObservable()
        };
    }

    public setViewContainerRef(viewContainerRef: ViewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }

    private close(result?: any) {
        this.appRef.detachView(this.dialogComponentRef.hostView);
        this.dialogComponentRef.destroy();
        this.closeSubject.next(result);
    }

    private createComponent(component: Type<any>): ComponentRef<any> {
        return this.viewContainerRef.createComponent(component, { injector: this.injector });
    }
}
