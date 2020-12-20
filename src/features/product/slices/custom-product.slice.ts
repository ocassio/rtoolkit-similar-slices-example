import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductSliceName } from "./product.slices";
import { RootState } from "../../../app/store";
import { AbstractProductState, ProductReducer } from "./abstract-product.slice";

export const CUSTOM_PRODUCT_TYPE = "custom";

export interface CustomProductState extends AbstractProductState {
    type: typeof CUSTOM_PRODUCT_TYPE;
    chars: Record<string, string>;
    loading: boolean;
}

export const createCustomProductSlice = (sliceName: ProductSliceName) => {

    // Actions

    const setChar = createAction<{ name: string, value: string }>(sliceName + "/setChar");

    const loadChars = createAsyncThunk(
        sliceName + "/loadChars",
        () => new Promise<Record<string, string>>(resolve => {
            setTimeout(
                () => resolve({
                    "Server Char 1": "Value 1",
                    "Server Char 2": "Value 2"
                }),
                1000
            )
        })
    );

    // Selectors

    const customProductSelector = <T> (selector: (state: CustomProductState) => T, fallbackValue: T): (state: RootState) => T => {
        return (state: RootState) => {
            const s = state[sliceName];
            return s?.type === CUSTOM_PRODUCT_TYPE ? selector(s) : fallbackValue;
        };
    }

    const selectChars = customProductSelector(state => state.chars, {});
    const selectLoading = customProductSelector(state => state.loading, false);

    // Reducer

    const reducer: ProductReducer<CustomProductState> = (state, action) => {
        if (setChar.match(action)) {
            const { name, value } = action.payload;
            state.chars[name] = value;
            return;
        }

        if (loadChars.pending.match(action)) {
            state.loading = true;
            return;
        }

        if (loadChars.fulfilled.match(action)) {
            state.chars = action.payload;
            state.loading = false;
            return;
        }
    }

    return {
        reducer,
        actions: {
            setChar,
            loadChars
        },
        selectors: {
            selectChars,
            selectLoading
        }
    };
} 
