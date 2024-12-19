import { Component } from '@angular/core';
import { NavigationComponent } from "../navigation/navigation.component";
import { AiRecommendationFabComponent } from "../../components/ai-recommendation-fab/ai-recommendation-fab.component";

@Component({
    selector: 'customer-default-layout',
    standalone: true,
    imports: [
        NavigationComponent,
        AiRecommendationFabComponent
    ],
    templateUrl: './customer-default-layout.component.html',
})
export class CustomerDefaultLayoutComponent {

}
