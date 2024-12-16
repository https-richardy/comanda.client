import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AddressCardComponent } from "./address-card.component";
import { Address } from "../../models/address.model";
import { By } from "@angular/platform-browser";

describe("AddressCardComponent", () => {
    var component: AddressCardComponent;
    var fixture: ComponentFixture<AddressCardComponent>;

    beforeEach(async () => {
        var testBed = TestBed.configureTestingModule({
            imports: [AddressCardComponent]
        });

        await testBed.compileComponents();

        fixture = TestBed.createComponent(AddressCardComponent);
        component = fixture.componentInstance;
    });

    it("should create the component", () => {
        var address: Address = {
            id: 1,
            street: "Rua A",
            number: "123",
            neighborhood: "Centro",
            city: "São Paulo",
            state: "SP",
            postalCode: "01000-000",
            complement: "Apt 101",
            reference: "Próximo à praça",
        };

        component.address = address;
        fixture.detectChanges();

        var renderedText = fixture.nativeElement.textContent;

        expect(renderedText).toContain("Rua A, 123");
        expect(renderedText).toContain("Centro");
        expect(renderedText).toContain("São Paulo - SP");
        expect(renderedText).toContain("CEP: 01000-000");
        expect(renderedText).toContain("Complemento: Apt 101");
        expect(renderedText).toContain("Referência: Próximo à praça");
    });

    it('should emit onClick event when clicked', () => {
        var address: Address = {
            id: 1,
            street: "Rua A",
            number: "123",
            neighborhood: "Centro",
            city: "São Paulo",
            state: "SP",
            postalCode: "01000-000",
            complement: "Apt 101",
            reference: "Próximo à praça",
        };

        component.address = address;
        var emitSpy = spyOn(component.onClick, "emit");
        fixture.detectChanges();

        var cardElement = fixture.debugElement.query(By.css(".w-full"));
        cardElement.triggerEventHandler("click", null);

        expect(emitSpy).toHaveBeenCalledWith(address);
    });

    it("should not render complement and reference when not provided", () => {
        var address: Address = {
            id: 1,
            street: "Rua A",
            number: "123",
            neighborhood: "Centro",
            city: "São Paulo",
            state: "SP",
            postalCode: "01000-000",
            complement: null,
            reference: null,
        };

        component.address = address;
        fixture.detectChanges();

        var renderedText = fixture.nativeElement.textContent;

        expect(renderedText).not.toContain("Complemento:");
        expect(renderedText).not.toContain("Referência:");
    });

    it("should emit onClick event with the correct address when clicked", () => {
        var address: Address = {
            id: 1,
            street: "Rua A",
            number: "123",
            neighborhood: "Centro",
            city: "São Paulo",
            state: "SP",
            postalCode: "01000-000",
            complement: "Apt 101",
            reference: "Próximo à praça",
        };

        component.address = address;
        fixture.detectChanges();

        var emitSpy = spyOn(component.onClick, "emit");
        var cardElement = fixture.debugElement.query(By.css(".w-full"));

        cardElement.triggerEventHandler("click", null);

        expect(emitSpy).toHaveBeenCalledWith(jasmine.objectContaining({
            id: 1,
            street: "Rua A",
            number: "123",
            neighborhood: "Centro",
            city: "São Paulo",
            state: "SP",
            postalCode: "01000-000",
            complement: "Apt 101",
            reference: "Próximo à praça"
        }));
    });
});