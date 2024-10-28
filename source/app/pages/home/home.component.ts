import { Component } from '@angular/core';
import { ProductGalleryComponent } from "../../components/product-gallery/product-gallery.component";
import { MainLayoutComponent } from "../../layout/main-layout/main-layout.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductGalleryComponent,
    MainLayoutComponent
  ],
  templateUrl: './home.component.html'
})
export class HomePageComponent {

}
