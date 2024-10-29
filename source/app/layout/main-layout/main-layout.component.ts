import { Component } from '@angular/core';
import { NavigationComponent } from "../navigation/navigation.component";
import { AiRecommendationFabComponent } from "../../components/ai-recommendation-fab/ai-recommendation-fab.component";
import { SearchComponent } from "../../components/search/search.component";

@Component({
    selector: 'main-layout',
    standalone: true,
    imports: [
    NavigationComponent,
    AiRecommendationFabComponent,
    SearchComponent,
],
    templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent {

}
