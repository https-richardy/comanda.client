import { Observable } from "rxjs";

export interface DialogRef {
    close: (result?: any) => void;
    afterClosed: () => Observable<any>;
}