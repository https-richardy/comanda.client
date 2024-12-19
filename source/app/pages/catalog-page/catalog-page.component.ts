import { Component } from '@angular/core';
import { CatalogManagementCardComponent } from "./components/catalog-management-card/catalog-management-card.component";
import { AdministratorDefaultLayoutComponent } from "../../layout/administrator-default-layout/administrator-default-layout.component";
import { AuthorizeViewComponent } from "../../modules/authorization/components/authorize-view/authorize-view.component";
import { AuthorizedComponent } from "../../modules/authorization/components/authorized/authorized.component";

@Component({
    selector: 'app-catalog-page',
    standalone: true,
    templateUrl: './catalog-page.component.html',
    imports: [
        CatalogManagementCardComponent,
        AdministratorDefaultLayoutComponent,
        AuthorizeViewComponent,
        AuthorizedComponent
],
})
export class CatalogPageComponent {

}
