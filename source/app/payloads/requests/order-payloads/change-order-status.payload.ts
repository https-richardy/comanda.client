import { OrderStatus } from "../../../models/order-status.enum";

export type ChangeOrderStatusRequest = {
    orderId: number;
    status: OrderStatus;
};