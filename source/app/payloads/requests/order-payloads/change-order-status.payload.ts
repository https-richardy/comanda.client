import { OrderStatus } from "../../../models/order-status.enum";

export type ChangeOrderStatus = {
    orderId: number;
    status: OrderStatus;
};