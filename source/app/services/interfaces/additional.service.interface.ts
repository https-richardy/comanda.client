import { Observable } from "rxjs";
import { Additional } from "../../models/additional.model";
import { AdditionalEditingRequest } from "../../payloads/requests/additionals-payloads/additional-editing.payload";
import { AdditionalCreationRequest } from "../../payloads/requests/additionals-payloads/additional-creation.payload";

export interface IAdditionalService {
    getAdditionals(): Observable<Additional[]>;
    getAdditionalsByCategory(categoryId: number): Observable<Additional[]>;
    createAddtional(additional: AdditionalCreationRequest): Observable<void>;
    updateAdditional(additional: AdditionalEditingRequest): Observable<void>;
    deleteAdditional(additional: Additional): Observable<void>;
}