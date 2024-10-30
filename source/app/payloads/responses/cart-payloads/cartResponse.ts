import { FormattedCartItem } from "./formattedCartItem";

export type CartResponse = {
    total: number;
    items: FormattedCartItem[];
}