export class Ingredient {
    public id: number;
    public name: string;
    public standardQuantity: number;
    public isMandatory: boolean;

    public constructor(id: number, name: string, standardQuantity: number, isMandatory: boolean) {
        this.id = id;
        this.name = name;
        this.standardQuantity = standardQuantity;
        this.isMandatory = isMandatory;
    }
}