import { ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, Injectable } from '@angular/core';
import { SnackbarPosition } from '../common/enums/snackbar-position.enum';
import { SnackbarType } from '../common/enums/snackbar-type.enum';
import { Icons } from '../common/enums/icons.enum';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
    private readonly applicationRef: ApplicationRef;
    private readonly injector: EnvironmentInjector;
    private snackbarQueue: ComponentRef<SnackbarComponent>[] = [];

    public constructor(applicationRef: ApplicationRef, injector: EnvironmentInjector) {
        this.applicationRef = applicationRef;
        this.injector = injector;
    }

    public open(
        title: string,
        text: string,
        options: {
            position?: SnackbarPosition,
            type?: SnackbarType,
            icon?: Icons,
            duration?: number
        } = {  }
    ) {
        const defaultOptions = {
            position: SnackbarPosition.BottomLeft,
            type: SnackbarType.Info,
            icon: Icons.Info,
            duration: 3
        };

        var finalOptions = { ...defaultOptions, ...options };
        var snackbarRef = this.createSnackbarComponent();

        snackbarRef.instance.title = title;
        snackbarRef.instance.text = text;
        snackbarRef.instance.position = finalOptions.position;
        snackbarRef.instance.icon = finalOptions.icon;
        snackbarRef.instance.type = finalOptions.type;
        snackbarRef.instance.duration = finalOptions.duration;

        this.snackbarQueue.push(snackbarRef);

        if (this.snackbarQueue.length === 1) {
            this.showNextSnackbar();
        }
    }

    private showNextSnackbar() {
        var nextSnackbar = this.snackbarQueue[0];
        this.applicationRef.attachView(nextSnackbar.hostView);

        document.body.appendChild(nextSnackbar.location.nativeElement);

        nextSnackbar.instance.ngOnDestroy = () => {
            this.snackbarQueue.shift();
            this.applicationRef.detachView(nextSnackbar.hostView);

            nextSnackbar.location.nativeElement.remove();
            if (this.snackbarQueue.length > 0) {
                this.showNextSnackbar();
            }
        };
    }

    private createSnackbarComponent(): ComponentRef<SnackbarComponent> {
        var snackbarComponentRef = createComponent(SnackbarComponent, {
            environmentInjector: this.injector,
            hostElement: document.createElement('div')
        });

        return snackbarComponentRef;
    }
}
