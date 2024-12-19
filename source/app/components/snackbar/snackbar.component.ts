import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SnackbarPosition } from '../../common/enums/snackbar-position.enum';
import { SnackbarType } from '../../common/enums/snackbar-type.enum';
import { Icons } from '../../common/enums/icons.enum';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-snackbar',
    templateUrl: './snackbar.component.html',
    styleUrl: './snackbar.component.css',
    standalone: true,
    imports: [ CommonModule ],
})
export class SnackbarComponent implements OnInit, OnDestroy {
    @Input() public title: string = "";
    @Input() public text: string = "";
    @Input() public position: SnackbarPosition = SnackbarPosition.BottomRight;
    @Input() public icon: Icons = Icons.Info;
    @Input() public type: SnackbarType = SnackbarType.Info;
    @Input() public duration: number = 5;

    public ngOnInit(): void {
        setTimeout(() => {
            this.ngOnDestroy();
        }, this.duration * 1000);
    }

    public ngOnDestroy(): void {
        
    }
}
