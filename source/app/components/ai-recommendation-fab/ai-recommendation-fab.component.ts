import { Component } from '@angular/core';
import { DialogService } from '../../services/dialog.service';
import { RecommendationDialogComponent } from '../dialogs/recommendation-dialog/recommendation-dialog.component';
import { Icons } from '../../common/enums/icons.enum';

@Component({
    selector: 'recommendation-fab',
    standalone: true,
    imports: [],
    templateUrl: './ai-recommendation-fab.component.html',
})
export class AiRecommendationFabComponent {
    public icons = Icons;
    private readonly dialogService: DialogService;

    public constructor(dialogService: DialogService) {
        this.dialogService = dialogService;
    }

    public getRecommendation(): void {
        this.dialogService.open(RecommendationDialogComponent);
    }
}
