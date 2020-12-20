import { createAction } from "@reduxjs/toolkit";
import { productActions, productSlice, ProductSliceName } from "./product.slices";
import { RootState } from "../../../app/store";
import { AbstractProductState, ProductReducer } from "./abstract-product.slice";

export const CUSTOM_PRODUCT_TYPE = "custom";

export interface CustomProductState extends AbstractProductState {
    type: typeof CUSTOM_PRODUCT_TYPE;
    chars: Record<string, string>;
}

export const createCustomProductSlice = (prefix: string) => {
    const setChar = createAction<{ name: string, value: string }>(prefix + "setChar");

    const reducer: ProductReducer<CustomProductState> = (state, action) => {
        if (setChar.match(action)) {
            const { name, value } = action.payload;
            state.chars[name] = value;
            return;
        }
    }

    return {
        reducer,
        actions: {
            setChar
        }
    };
} 

export const setChar = (name: ProductSliceName) => productActions(name).setChar;

export const selectChars = (name: ProductSliceName) => (state: RootState) => {
    const s = state[name];
    return s?.type === CUSTOM_PRODUCT_TYPE ? s.chars : {};
}
