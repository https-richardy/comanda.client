import { Component } from '@angular/core';
import { NavigationComponent } from "../navigation/navigation.component";
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'administrator-default-layout',
    standalone: true,
    imports: [
        NavigationComponent
    ],
    templateUrl: './administrator-default-layout.component.html'
})
export class AdministratorDefaultLayoutComponent {
    private readonly notificationService: NotificationService;

    public constructor(notificationService: NotificationService) {
        this.notificationService = notificationService;
    }
}
