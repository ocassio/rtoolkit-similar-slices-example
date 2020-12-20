import { createAction } from "@reduxjs/toolkit";
import { ProductSliceName } from "./product.slices";
import { RootState } from "../../../app/store";
import { AbstractProductState, ProductReducer } from "./abstract-product.slice";

export const CUSTOM_PRODUCT_TYPE = "custom";

export interface CustomProductState extends AbstractProductState {
    type: typeof CUSTOM_PRODUCT_TYPE;
    chars: Record<string, string>;
}

export const createCustomProductSlice = (sliceName: ProductSliceName) => {

    const setChar = createAction<{ name: string, value: string }>(sliceName + "setChar");

    const selectChars = (state: RootState) => {
        const s = state[sliceName];
        return s?.type === CUSTOM_PRODUCT_TYPE ? s.chars : {};
    }

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
        },
        selectors: {
            selectChars
        }
    };
} 
