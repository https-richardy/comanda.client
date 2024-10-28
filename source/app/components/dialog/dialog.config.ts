export interface DialogConfiguration {
    data?: any;
    width?: string;
    maxWidth?: string;
    position?: 'center' | 'top' | 'bottom';
    closeOnEscape?: boolean;
    closeOnBackdrop?: boolean;
    showCloseButton?: boolean;
}