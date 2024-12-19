import { Component } from '@angular/core';
import { AuthorizeViewComponent } from "../../modules/authorization/components/authorize-view/authorize-view.component";
import { AuthorizedComponent } from "../../modules/authorization/components/authorized/authorized.component";
import { AdministratorDefaultLayoutComponent } from "../administrator-default-layout/administrator-default-layout.component";
import { CustomerDefaultLayoutComponent } from "../customer-default-layout/customer-default-layout.component";

@Component({
    selector: 'main-layout',
    standalone: true,
    templateUrl: './main-layout.component.html',
    imports: [
        AuthorizeViewComponent,
        AuthorizedComponent,
        AdministratorDefaultLayoutComponent,
        CustomerDefaultLayoutComponent
    ],
})
export class MainLayoutComponent {

}
