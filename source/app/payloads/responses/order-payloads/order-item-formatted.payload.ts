import { OrderItemAdditional } from "./order-item-additional.payload";
import { UnselectedIngredient } from "./unselected-ingredient.payload";

export type OrderItemFormatted = {
    product: string;
    quantity: number;

    additionals: OrderItemAdditional[];
    unselectedIngredients: UnselectedIngredient[];
};