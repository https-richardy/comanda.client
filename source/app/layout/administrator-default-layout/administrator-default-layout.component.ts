import { Component } from '@angular/core';
import { NavigationComponent } from "../navigation/navigation.component";

@Component({
    selector: 'administrator-default-layout',
    standalone: true,
    imports: [
        NavigationComponent
    ],
    templateUrl: './administrator-default-layout.component.html'
})
export class AdministratorDefaultLayoutComponent {

}
