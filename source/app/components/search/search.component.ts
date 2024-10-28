import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'search',
    standalone: true,
    providers: [ ProductService ],
    imports: [ CommonModule, FormsModule ],
    templateUrl: './search.component.html',
})
export class SearchComponent {
    public searchTerm: string = "";
    public isFocused: boolean = false;

    private readonly productService: ProductService;
    @Output() public onSearch = new EventEmitter<Product[]>();

    public constructor(productService: ProductService) {
        this.productService = productService;
    }

    public handleOnFocus(): void {
        this.isFocused = true;
    }

    public handleOnBlur(): void {
        this.isFocused = false;
    }

    public performSearch(): void {
        console.log("Realizando pesquisa: ", this.searchTerm);
        this.onSearch.emit([])
    }
}
