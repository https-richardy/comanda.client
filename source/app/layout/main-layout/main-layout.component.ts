import { Component } from '@angular/core';
import { NavigationComponent } from "../navigation/navigation.component";

@Component({
    selector: 'main-layout',
    standalone: true,
    imports: [NavigationComponent],
    templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent {

}
