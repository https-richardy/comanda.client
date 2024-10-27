import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'search',
    standalone: true,
    imports: [ CommonModule ],
    templateUrl: './search.component.html',
})
export class SearchComponent {
    public isFocused: boolean = false;

    public handleOnFocus(): void {
      this.isFocused = true;
    }

    public handleOnBlur(): void {
      this.isFocused = false;
    }
}
