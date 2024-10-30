import { Component } from '@angular/core';
import { NavigationItemComponent } from "../navigation-item/navigation-item.component";
import { CartNavigationItemComponent } from "../cart-navigation-item/cart-navigation-item.component";

@Component({
    selector: 'navigation',
    standalone: true,
    imports: [NavigationItemComponent, CartNavigationItemComponent],
    templateUrl: './navigation.component.html',
})
export class NavigationComponent {

}
