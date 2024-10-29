import { Category } from "./category.model";
import { Ingredient } from "./ingredient.model";

export class Product {
    public id: number;
    public title: string;
    public price: number;
    public image: string;
    public description: string;

    public category: Category;
    public ingredients: Ingredient[] = [];

    public constructor(
        id: number,
        title: string,
        price: number,
        image: string,
        description: string,
        category: Category
    ) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.image = image;
        this.description = description;
        this.category = category;
    }
}