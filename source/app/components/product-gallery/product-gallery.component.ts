import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SearchComponent } from "../search/search.component";
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'product-gallery',
    standalone: true,
    providers: [ ProductService ],
    imports: [
        CommonModule,
        ProductCardComponent,
        SearchComponent
    ],
    templateUrl: './product-gallery.component.html',
})
export class ProductGalleryComponent implements OnInit {
    private readonly productService: ProductService;
    public products: Product[] = [];

    public constructor(productService: ProductService) {
        this.productService = productService;
    }

    public ngOnInit(): void {
        this.productService.getProducts().subscribe((products) => {
            this.products = products;
        });
    }
}
