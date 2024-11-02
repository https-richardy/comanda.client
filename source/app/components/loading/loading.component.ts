import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'loading',
    standalone: true,
    imports: [ CommonModule ],
    templateUrl: './loading.component.html',
})
export class LoadingComponent {
    @Input() isVisible: boolean = false;
    @Input() message: string = 'Carregando...';
}
