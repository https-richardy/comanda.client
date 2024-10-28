export class CartItem {
    public id: number;
    public title: string;
    public image: string;
    public price: number;
    public quantity: number;

    public constructor(id: number, title: string, image: string, price: number, quantity: number) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.price = price;
        this.quantity = quantity;
    }
}