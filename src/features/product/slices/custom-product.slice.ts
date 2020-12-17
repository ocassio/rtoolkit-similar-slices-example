import { createAction } from "@reduxjs/toolkit";
import { productSlice, ProductSliceName } from "./product.slices";
import { RootState } from "../../../app/store";
import { AbstractProductState, ProductReducer } from "./abstract-product.slice";

export interface CustomProductState extends AbstractProductState {
    type: "custom";
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

export const setChar = (name: ProductSliceName) => productSlice(name).actions.setChar;

export const selectChars = (name: ProductSliceName) => (state: RootState) => {
    const s = state[name];
    return s?.type === "custom" ? s.chars : {};
}
