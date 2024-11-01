import { Component, OnInit } from '@angular/core';
import { RecommendationService } from '../../../services/recommendation.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-recommendation-dialog',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './recommendation-dialog.component.html'
})
export class RecommendationDialogComponent implements OnInit {
    private readonly recommendationService: RecommendationService;

    public recommendation: string = "";
    public isBusy: boolean = true;

    public constructor(recommendationService: RecommendationService) {
        this.recommendationService = recommendationService;
    }

    public ngOnInit(): void {
        this.recommendationService
            .getRecommendation()
            .subscribe({
                next: (recommendation) => {
                    this.recommendation = recommendation.suggestion;
                    this.isBusy = false;
                },
                error: () => {
                    this.isBusy = false;
                    this.recommendation = "Ocorreu um erro ao tentar gerar sua recomendação. Tente novamente mais tarde.";
                }
            });
    }
}
