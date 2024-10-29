import { Observable } from "rxjs";
import { Additional } from "../../models/additional.model";

export interface IAdditionalService {
    getAdditionals(): Observable<Additional[]>;
    getAdditionalsByCategory(categoryId: number): Observable<Additional[]>;
}