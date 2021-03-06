import { StandaloneProductState } from "../abstract/abstract-product.slice";
import { CustomProductState, CUSTOM_PRODUCT_TYPE } from "./custom-product.slice";

export const customProductSelector = <T> (selector: (state: CustomProductState) => T, fallbackValue: T): (state: StandaloneProductState) => T => {
    return (state: StandaloneProductState) => {
        const s = state?.type === CUSTOM_PRODUCT_TYPE ? state : null;
        return s ? selector(s) : fallbackValue;
    };
}

export const selectChars = customProductSelector(state => state.chars.values, {});
export const selectLoading = customProductSelector(state => state.loading, false);
