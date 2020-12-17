import { createAction } from "@reduxjs/toolkit";
import { AbstractProductState, ProductReducer, productSlice, ProductSliceName } from "./product.slice";
import { RootState } from "../../../app/store";

export interface GenericProductState extends AbstractProductState {
    type: "generic";
    count: number;
}

export const createGenericProductSlice = (prefix: string) => {
    const increase = createAction<number>(prefix + "increase");
    const reducer: ProductReducer<GenericProductState> = (state, action) => {
        if (increase.match(action)) {
            state.count++;
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
