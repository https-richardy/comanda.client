import { Component } from '@angular/core';
import { CatalogManagementCardComponent } from "./components/catalog-management-card/catalog-management-card.component";
import { AdministratorDefaultLayoutComponent } from "../../layout/administrator-default-layout/administrator-default-layout.component";

@Component({
    selector: 'app-catalog-page',
    standalone: true,
    templateUrl: './catalog-page.component.html',
    imports: [
        CatalogManagementCardComponent,
        AdministratorDefaultLayoutComponent
    ],
})
export class CatalogPageComponent {

}
