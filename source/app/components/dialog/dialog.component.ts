import { Component, EventEmitter, Input, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { DialogConfiguration } from './dialog-configuration';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'dialog',
    standalone: true,
    imports: [ CommonModule ],
    templateUrl: './dialog.component.html',
})
export class DialogComponent {
    @Input() public isOpen: boolean = false;
    @Input() public configuration: DialogConfiguration = {};
    @Output() public closed = new EventEmitter<void>();

    @ViewChild('dialogContent', { read: ViewContainerRef, static: true })
    public dialogContent!: ViewContainerRef;

    public loadComponent(component: any) {
        this.dialogContent.createComponent(component);
    }

    public close() {
        this.isOpen = false;
        this.closed.emit();
    }

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
