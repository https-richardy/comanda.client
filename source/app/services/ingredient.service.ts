import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { API_BASE_URL } from "../app.tokens";
import { map, Observable } from "rxjs";
import { Ingredient } from "../models/ingredient.model";
import { Response } from "../payloads/responses/response";
import { IngredientCreationRequest } from "../payloads/requests/ingredients-payloads/ingredient-creation.payload";
import { IngredientEditingRequest } from "../payloads/requests/ingredients-payloads/ingredient-editing.payload";

@Injectable({ providedIn: "root" })
export class IngredientService {
    private readonly httpClient: HttpClient;
    private readonly baseAddress: string = `${inject(API_BASE_URL)}api/ingredients`;

    public constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    public getAllIngredients(): Observable<Ingredient[]> {
        return this.httpClient.get<Response<Ingredient[]>>(this.baseAddress).pipe(
            map((response) => {
                return response.data || [  ];
            })
        );
    }

    public createIngredient(ingredient: IngredientCreationRequest): Observable<void> {
        return this.httpClient.post<Response<null>>(this.baseAddress, ingredient).pipe(
            map(() => {
                return void 0;
            })
        );
    }

    public updateIngredient(ingredient: IngredientEditingRequest): Observable<void>  {
        return this.httpClient.put<Response<null>>(`${this.baseAddress}/${ingredient.id}`, ingredient).pipe(
            map(() => {
                return void 0;
            })
        );
    }

    public deleteIngredient(ingredientId: number): Observable<void> {
        return this.httpClient.delete<Response<null>>(`${this.baseAddress}/${ingredientId}`).pipe(
            map(() => {
                return void 0;
            })
        );
    }
}