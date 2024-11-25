import { Observable } from "rxjs";
import { ProfileInformation } from "../../payloads/responses/identity-payloads/profileInformation";

export interface IProfileService {
    getProfileInformation(): Observable<ProfileInformation>;
}