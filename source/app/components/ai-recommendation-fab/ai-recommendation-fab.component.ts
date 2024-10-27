import { Component } from '@angular/core';

@Component({
    selector: 'recommendation-fab',
    standalone: true,
    imports: [],
    templateUrl: './ai-recommendation-fab.component.html',
})
export class AiRecommendationFabComponent {
    public getRecommendation(): void {
        console.log("Solicitando recomendação de produto por IA");
    }
}
