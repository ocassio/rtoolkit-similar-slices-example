import { customProductFeatureCaseSelectors } from "../custom-product.slice";
import { genericProductFeatureCaseSelectors } from "../generic-product.slice";

export const productCaseSelectors: Record<string, (state: any) => any> = {
    ...genericProductFeatureCaseSelectors,
    ...customProductFeatureCaseSelectors
}
