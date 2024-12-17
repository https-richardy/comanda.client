import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../../../services/product.service';

@Component({
    selector: 'app-product-image-upload-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    templateUrl: './product-image-upload-form.component.html'
})
export class ProductImageUploadFormComponent {
    public productId!: number;
    public file!: File | undefined;

    public imageUploadForm: FormGroup;
    public imagePreview: string | ArrayBuffer | null = null;
    public onValidSubmit = new EventEmitter<void>;

    private readonly formBuilder: FormBuilder;
    private readonly productService: ProductService;

    public constructor(formBuilder: FormBuilder, productService: ProductService) {
        this.formBuilder = formBuilder;
        this.productService = productService;

        this.imageUploadForm = this.formBuilder.group({
            image: [null, Validators.required]
        });
    }

    public onFileChange(event: Event): void {
        var file = (event.target as HTMLInputElement)?.files?.[0];
        this.file = file;

        if (file) {
            if (file.type.startsWith("image/")) {
                var reader = new FileReader();
                reader.onload = () => {
                    this.imagePreview = reader.result;
                };

                reader.readAsDataURL(file);
            }
            else {
                alert("Por favor, selecione um arquivo de imagem!");
                this.imageUploadForm.get("image")?.reset();
            }
        }
    }

    public onSubmit(): void {
        if (this.imageUploadForm.valid) {
            this.productService
                .uploadImage(this.productId, this.file!)
                .subscribe();

            this.onValidSubmit.emit();
        }
    }
}