import { IngredientAssociationScheme } from "./ingredient-association-scheme.payload";

export type ProductCreationRequest = {
    title: string;
    description: string;
    price: number;
    categoryId: number;
    ingredients: IngredientAssociationScheme[];
};