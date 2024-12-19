import { inject, Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { API_BASE_URL } from '../app.tokens';
import { StorageConstants } from '../common/storage-constants';
import { Notification } from '../payloads/responses/notification';

@Injectable({ providedIn: 'root' })
export class NotificationService {
    private readonly hubConnection: signalR.HubConnection
    private readonly audio = new Audio("assets/sounds/notification.mp3");

    public constructor() {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${inject(API_BASE_URL)}notification`, {
                accessTokenFactory: () => localStorage.getItem(StorageConstants.AuthenticationToken) || "",
            })
            .withAutomaticReconnect()
            .build();

        this.startConnection();

        this.hubConnection.on("receiveNotification", (notification: Notification) => {
            console.log(notification);
            this.playNotificationSound();
        });
    }

    private startConnection(): void {
        this.hubConnection
            .start()
            .then(() => {
                console.log("Conectado com sucesso ao SignalR Hub!");
            })
            .catch((error) => {
                console.error("Erro ao conectar ao SignalR Hub:", error);
            });
    }

    private playNotificationSound(): void {
        this.audio.play().catch((error) => {
            console.error("Erro ao tentar reproduzir o som da notificação:", error);
        });
    }
}
