export class Product {
    public id: number;
    public title: string;
    public price: number;
    public image: string;
    public description: string;

    public constructor(id: number, title: string, price: number, image: string, description: string) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.image = image;
        this.description = description;
    }
}