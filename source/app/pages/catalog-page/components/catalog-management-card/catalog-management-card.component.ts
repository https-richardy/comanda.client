import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'catalog-management-card',
    standalone: true,
    imports: [],
    templateUrl: './catalog-management-card.component.html',
})
export class CatalogManagementCardComponent {
    @Input() iconClass: string = "";
    @Input() title: string = "";
    @Input() description: string = "";
    @Input() navigateTo: string = "";

    private readonly routeHelper: Router;

    public constructor(routeHelper: Router) {
        this.routeHelper = routeHelper;
    }

    public handleOnClick(): void {
        this.routeHelper.navigate([this.navigateTo]);
    }
}
