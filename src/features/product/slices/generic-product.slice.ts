import { createAction, createSelector } from "@reduxjs/toolkit";
import { ProductSliceName } from "./product.slices";
import { RootState } from "../../../app/store";
import { AbstractProductState, ProductReducer } from "./abstract-product.slice";

export const GENERIC_PRODUCT_TYPE = "generic";

export interface GenericProductState extends AbstractProductState {
    type: typeof GENERIC_PRODUCT_TYPE;
    count: number;
}

export const createGenericProductSlice = (sliceName: ProductSliceName) => {
    
    const increase = createAction<number>(sliceName + "/increase");

    const selectCount = (state: RootState) => {
        const s = state[sliceName];
        return s?.type === GENERIC_PRODUCT_TYPE ? s.count : 0;
    }

    const selectCountX2 = createSelector(
        selectCount,
        count => count * 2
    );

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
        },
        selectors: {
            selectCount,
            selectCountX2
        }
    };
}
