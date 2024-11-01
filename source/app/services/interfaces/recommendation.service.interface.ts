import { Observable } from "rxjs";
import { Recommendation } from "../../payloads/responses/recommendation-payloads/recommendation";

export interface IRecommendationService {
    getRecommendation(): Observable<Recommendation>;
}