import { OrderStatus } from "../../../models/order-status.enum";

export type FetchOrdersRequest = {
    pageNumber: number;
    pageSize: number;
    status: OrderStatus;
}