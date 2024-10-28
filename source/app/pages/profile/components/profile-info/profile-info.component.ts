import { Component, Input } from '@angular/core';
import { IProfileInformation } from './profile-info.interface';

@Component({
    selector: 'profile-info',
    standalone: true,
    imports: [],
    templateUrl: './profile-info.component.html',
})
export class ProfileInfoComponent {
    @Input() public user!: IProfileInformation;
}
