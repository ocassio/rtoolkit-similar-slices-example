import { createSelector } from "@reduxjs/toolkit";
import { StandaloneProductState } from "../abstract/abstract-product.slice";
import { GenericProductState, GENERIC_PRODUCT_TYPE } from "./generic-product.slice";

export const genericProductSelector = <T> (selector: (state: GenericProductState) => T, fallbackValue: T): (state: StandaloneProductState) => T => {
    return (state: StandaloneProductState) => {
        const s = state?.type === GENERIC_PRODUCT_TYPE ? state : null;
        return s ? selector(s) : fallbackValue;
    };
}

export const selectCount = genericProductSelector(state => state.count, 0);

export const createSelectCountX2 = () => createSelector(
    selectCount,
    count => count * 2
);
