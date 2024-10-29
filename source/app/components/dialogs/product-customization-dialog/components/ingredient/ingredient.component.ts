import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Ingredient } from '../../../../../models/ingredient.model';

@Component({
  selector: 'ingredient',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './ingredient.component.html'
})
export class IngredientComponent {
  @Input() public ingredient!: Ingredient;
}
