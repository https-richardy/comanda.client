import { OrderStatus } from "../../../models/order-status.enum";

export type FormattedOrder = {
    id: number;
    customer: string;
    shippingAddress: string;
    total: number;
    status: OrderStatus
    date: Date
}