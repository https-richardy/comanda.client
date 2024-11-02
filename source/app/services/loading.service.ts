import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingModalService {
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private messageSubject = new BehaviorSubject<string>('Carregando...');

    public loading$ = this.loadingSubject.asObservable();
    public message$ = this.messageSubject.asObservable();

    public show(message: string = 'Carregando...'): void {
        this.messageSubject.next(message);
        this.loadingSubject.next(true);
    }

    public hide(): void {
        this.loadingSubject.next(false);
    }
}