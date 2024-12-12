import { Component } from '@angular/core';
import { MainLayoutComponent } from "../../layout/main-layout/main-layout.component";
import { CatalogManagementCardComponent } from "./components/catalog-management-card/catalog-management-card.component";

@Component({
    selector: 'app-catalog-page',
    standalone: true,
    imports: [
        MainLayoutComponent,
        CatalogManagementCardComponent,
    ],
    templateUrl: './catalog-page.component.html'
})
export class CatalogPageComponent {

}
