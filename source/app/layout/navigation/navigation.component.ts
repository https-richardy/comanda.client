import { Component } from '@angular/core';
import { NavigationItemComponent } from "../navigation-item/navigation-item.component";
import { CartNavigationItemComponent } from "../cart-navigation-item/cart-navigation-item.component";
import { AuthorizeViewComponent } from "../../modules/authorization/components/authorize-view/authorize-view.component";
import { AuthorizedComponent } from "../../modules/authorization/components/authorized/authorized.component";

@Component({
    selector: 'navigation',
    standalone: true,
    imports: [
        NavigationItemComponent,
        CartNavigationItemComponent,
        AuthorizeViewComponent,
        AuthorizedComponent
    ],
    templateUrl: './navigation.component.html',
})
export class NavigationComponent {

}
