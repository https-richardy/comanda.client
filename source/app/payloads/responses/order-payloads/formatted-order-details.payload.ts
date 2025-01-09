import { OrderStatus } from "../../../models/order-status.enum";
import { OrderItemFormatted } from "./order-item-formatted.payload";

export type FormattedOrderDetails = {
    id: number;
    customer: string;
    shippingAddress: string;

    items: OrderItemFormatted[];
    status: OrderStatus;
    date: Date;
};