import { Component } from '@angular/core';
import { NavigationComponent } from "../navigation/navigation.component";
import { AiRecommendationFabComponent } from "../../components/ai-recommendation-fab/ai-recommendation-fab.component";
import { AuthorizeViewComponent } from "../../modules/authorization/components/authorize-view/authorize-view.component";
import { AuthorizedComponent } from "../../modules/authorization/components/authorized/authorized.component";
import { AdministratorDefaultLayoutComponent } from "../administrator-default-layout/administrator-default-layout.component";
import { CustomerDefaultLayoutComponent } from "../customer-default-layout/customer-default-layout.component";

@Component({
    selector: 'main-layout',
    standalone: true,
    imports: [
    NavigationComponent,
    AiRecommendationFabComponent,
    AuthorizeViewComponent,
    AuthorizedComponent,
    AdministratorDefaultLayoutComponent,
    CustomerDefaultLayoutComponent
],
    templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent {

}
