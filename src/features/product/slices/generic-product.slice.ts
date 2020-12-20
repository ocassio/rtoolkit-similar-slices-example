import { createAction } from "@reduxjs/toolkit";
import { productActions, ProductSliceName } from "./product.slices";
import { RootState } from "../../../app/store";
import { AbstractProductState, ProductReducer } from "./abstract-product.slice";

export const GENERIC_PRODUCT_TYPE = "generic";

export interface GenericProductState extends AbstractProductState {
    type: typeof GENERIC_PRODUCT_TYPE;
    count: number;
}

export const createGenericProductSlice = (prefix: string) => {
    const increase = createAction<number>(prefix + "increase");

    const reducer: ProductReducer<GenericProductState> = (state, action) => {
        if (increase.match(action)) {
            state.count += action.payload;
            return;
        }
    }

    return {
        reducer,
        actions: {
            increase
        }
    };
}

export const increase = (name: ProductSliceName) => productActions(name).increase;

export const selectCount = (name: ProductSliceName) => (state: RootState) => {
    const s = state[name];
    return s?.type === GENERIC_PRODUCT_TYPE ? s.count : 0;
}
