import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayoutComponent } from "./layout/main-layout/main-layout.component";
import { ProductGalleryComponent } from "./components/product-gallery/product-gallery.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        MainLayoutComponent,
        ProductGalleryComponent
    ],
    templateUrl: './app.component.html'
})
export class AppComponent {
    title = "comanda.client"
}
