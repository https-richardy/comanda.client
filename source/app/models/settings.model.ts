export class Settings {
    public acceptAutomatically: boolean;
    public maxConcurrentAutomaticOrders: number;
    public estimatedDeliveryTimeInMinutes: number;
    public deliveryFee: number;

    public constructor(
        acceptAutomatically: boolean,
        maxConcurrentAutomaticOrders: number,
        estimatedDeliveryTimeInMinutes: number,
        deliveryFee: number
    ) {
        this.acceptAutomatically = acceptAutomatically;
        this.maxConcurrentAutomaticOrders = maxConcurrentAutomaticOrders;
        this.estimatedDeliveryTimeInMinutes = estimatedDeliveryTimeInMinutes;
        this.deliveryFee = deliveryFee;
    }
}