import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'navigation-item',
    standalone: true,
    imports: [ RouterModule ],
    templateUrl: './navigation-item.component.html',
})
export class NavigationItemComponent {
    @Input() public route: string = "";
    @Input() public label: string = "";
    @Input() public icon: string = "";
}
