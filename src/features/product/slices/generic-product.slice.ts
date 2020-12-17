import { createAction } from "@reduxjs/toolkit";
import { productSlice, ProductSliceName } from "./product.slices";
import { RootState } from "../../../app/store";
import { AbstractProductState, ProductReducer } from "./abstract-product.slice";

export interface GenericProductState extends AbstractProductState {
    type: "generic";
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

export const increase = (name: ProductSliceName) => productSlice(name).actions.increase;

export const selectCount = (name: ProductSliceName) => (state: RootState) => {
    const s = state[name];
    return s?.type === "generic" ? s.count : 0;
}
