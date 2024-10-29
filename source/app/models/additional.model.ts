import { Category } from "./category.model";

export class Additional {
    public id: number;
    public price: number;
    public category: Category;

    public constructor(id: number, price: number, category: Category) {
        this.id = id;
        this.price = price;
        this.category = category;
    }
}