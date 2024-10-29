import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-recommendation-dialog',
    standalone: true,
    imports: [],
    templateUrl: './recommendation-dialog.component.html'
})
export class RecommendationDialogComponent implements OnInit {
    public recommendation: string = "";

    public ngOnInit(): void {
        this.recommendation = "A geração de recomendação por IA ainda não está implementada! Volte mais tarde.";
    }
}
