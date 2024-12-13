import { Component, Input } from '@angular/core';

@Component({
    selector: 'tooltip',
    standalone: true,
    imports: [],
    templateUrl: './tooltip.component.html',
    styleUrl: './tooltip.component.css'
})
export class TooltipComponent {
    @Input() public text: string = "";
}
