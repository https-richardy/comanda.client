import { Component, Input, Type } from '@angular/core';
import { DialogConfiguration } from './dialog.config';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'dialog-container',
    standalone: true,
    imports: [ CommonModule ],
    templateUrl: './dialog.component.html',
})
export class DialogComponent {
    @Input() public childComponent!: Type<any>;
    @Input() public configuration!: DialogConfiguration;
    @Input() public close!: (result?: any) => void;

    public isOpen = true;

    public getWidthClass(width: string): string {
        const widthClasses = {
            'sm': 'w-full sm:w-96',
            'md': 'w-full sm:w-[32rem]',
            'lg': 'w-full sm:w-[48rem]',
            'xl': 'w-full sm:w-[64rem]',
            '2xl': 'w-full sm:w-[80rem]'
        };

        if (width in widthClasses) {
            return widthClasses[width as keyof typeof widthClasses];
        }

        return widthClasses['md'];
    }

    public getMaxWidthClass(maxWidth: string): string {
        const maxWidthClasses = {
          'sm': 'max-w-sm',
          'md': 'max-w-md',
          'lg': 'max-w-lg',
          'xl': 'max-w-xl',
          '2xl': 'max-w-2xl'
        };

        if (maxWidth in maxWidthClasses) {
            return maxWidthClasses[maxWidth as keyof typeof maxWidthClasses]
        }

        return maxWidthClasses['2xl'];
    }
}
