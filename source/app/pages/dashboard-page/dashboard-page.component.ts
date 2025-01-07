import { Component } from '@angular/core';
import { SummaryComponent } from './components/summary/summary.component';
import { AdministratorDefaultLayoutComponent } from "../../layout/administrator-default-layout/administrator-default-layout.component";
import { OrderPanelComponent } from "../../components/order-panel/order-panel.component";

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    standalone: true,
    imports: [
        SummaryComponent,
        AdministratorDefaultLayoutComponent,
        OrderPanelComponent
    ],
})
export class DashboardPageComponent {
    public constructor() {

    }
}
