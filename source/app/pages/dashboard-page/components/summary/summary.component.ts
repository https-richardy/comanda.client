import { Component, OnInit } from '@angular/core';
import { Summary } from '../../../../payloads/responses/summary-payloads/summary.payload';
import { Icons } from '../../../../common/enums/icons.enum';
import { CommonModule } from '@angular/common';
import { SummaryService } from '../../../../services/summary.service';

@Component({
    selector: 'summary',
    templateUrl: './summary.component.html',
    standalone: true,
    imports: [ CommonModule ],
})
export class SummaryComponent implements OnInit {
    private readonly summaryService: SummaryService;

    public icons = Icons;
    public summary: Summary = {
        totalRevenue: 0,
        processedOrders: 0,
        cancelledOrders: 0,
        averageOrderValue: 0,
        largestOrder: 0
    };

    public constructor(summaryService: SummaryService) {
        this.summaryService = summaryService;
    }

    public ngOnInit(): void {
        this.summaryService.getSummary().subscribe({
            next: (data) => {
                this.summary = data;
            },
            error: (error) => {
                console.error('Erro ao carregar os dados do resumo:', error);
            },
        });
    }
}
