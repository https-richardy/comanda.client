import { Component } from '@angular/core';
import { NavigationItemComponent } from "../navigation-item/navigation-item.component";

@Component({
    selector: 'navigation',
    standalone: true,
    imports: [ NavigationItemComponent ],
    templateUrl: './navigation.component.html',
})
export class NavigationComponent {

}
