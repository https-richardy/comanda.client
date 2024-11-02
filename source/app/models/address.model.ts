export class Address {
    public street: string;
    public number: string;
    public city: string;
    public state: string;
    public neighborhood: string;
    public postalCode: string;
    public complement: string | null;
    public reference: string | null;
    public id: number;

    public constructor(
        id: number,
        street: string,
        number: string,
        city: string,
        state: string,
        neighborhood: string,
        postalCode: string,
        complement: string | null = null,
        reference: string | null = null) {
        this.id = id;
        this.street = street;
        this.number = number;
        this.city = city;
        this.state = state;
        this.neighborhood = neighborhood;
        this.postalCode = postalCode;
        this.complement = complement;
        this.reference = reference;
    }
}
