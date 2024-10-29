import { Category } from "./category.model";

export class Additional {
    public id: number;
    public name: string;
    public price: number;
    public category: Category;

    public constructor(id: number, name: string, price: number, category: Category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
    }
}