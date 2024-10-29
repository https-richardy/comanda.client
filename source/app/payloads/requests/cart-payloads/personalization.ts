import { AdditionalSchema } from "./additionalSchema";

export type Personalization = {
    ingrendientsIdsToRemove: number[];
    additionals: AdditionalSchema[];
}