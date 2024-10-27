import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayoutComponent } from "./layout/main-layout/main-layout.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, MainLayoutComponent],
    templateUrl: './app.component.html'
})
export class AppComponent {
    title = 'comanda.client';
}
