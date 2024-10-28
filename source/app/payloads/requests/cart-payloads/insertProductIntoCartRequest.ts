import { AdditionalSchema } from "./additionalSchema";

export type InsertProductIntoCartRequest = {
    productId: number;
    quantity: number;

    additionals: AdditionalSchema[];
    ingredientsIdsToRemove: number[] | undefined;
}