import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'profile-action',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './profile-action.component.html',
})
export class ProfileActionComponent {
    @Input() public label: string = "";
    @Input() public icon: string = "";
    @Input() public link: string = "";
}
