import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SearchComponent } from "../search/search.component";

@Component({
    selector: 'product-gallery',
    standalone: true,
    imports: [
        CommonModule,
        ProductCardComponent,
        SearchComponent
    ],
    templateUrl: './product-gallery.component.html',
})
export class ProductGalleryComponent {
    public products: Product[] = [
        new Product(1, "X-Cheddar", 13.50, "https://i.pinimg.com/originals/4c/48/a5/4c48a5cbbdc9bf20a195f0d27df7072e.png", "Um sanduíche com queijo cheddar"),
        new Product(2, "X-Bacon", 12.50, "https://s3-sa-east-1.amazonaws.com/deliveryon-uploads/products/traillerdoserginho/109_55afcf792d36d.jpg", "Um sanduíche com queijo cheddar e bacon"),
        new Product(3, "X-Egg", 11.00, "https://sachefmio.blob.core.windows.net/fotos/x-egg-73519.jpg", "Um sanduíche com queijo cheddar, bacon e ovo"),
        new Product(4, "X-Montanha", 15.00, "https://imagens.jotaja.com/produtos/2818104e-d74f-4db0-84a9-21713b1be9d6.jpg", "O X-Montanha é um hambúrguer robusto e suculento, feito para quem não tem medo de encarar uma verdadeira montanha de sabor!"),
        new Product(5, "Coca-Cola 2L", 10.00, "https://soaresemcasa.com.br/storage/uploads/56XXW1ipbsn8jTLDZC6dyPPMYheKU9B0i3ibE27d.jpg", "O refrigerante que cairá bem com o seu lanche!")
    ];
}
