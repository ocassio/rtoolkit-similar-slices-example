import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AbstractProductState, StandaloneProductState } from "./abstract-product.slice";

export const CUSTOM_PRODUCT_TYPE = "custom";

export interface CustomProductState extends AbstractProductState {
    type: typeof CUSTOM_PRODUCT_TYPE;
    version: number;
    chars: {
        values: Record<string, string>;
        version: number;
    }
    loading: boolean;
}

const initialState: CustomProductState = null!!;

export const loadChars = createAsyncThunk(
    "product/custom/loadChars",
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

const slice = createSlice({
    name: "product/custom",
    initialState,
    reducers: {
        setChar(state, action: PayloadAction<{ name: string, value: string }>) {
            const { name, value } = action.payload;
            state.chars.values[name] = value;
        }
    },
    extraReducers: builder => {
        builder.addCase(loadChars.pending, state => {
            state.loading = true;
        });

        builder.addCase(loadChars.fulfilled, (state, action) => {
            state.chars.values = action.payload;
            state.loading = false;
        });
    }
});

export const { setChar } = slice.actions;

export const customProductReducer = slice.reducer;

const customProductSelector = <T> (selector: (state: CustomProductState) => T, fallbackValue: T): (state: StandaloneProductState) => T => {
    return (state: StandaloneProductState) => {
        const s = state?.type === CUSTOM_PRODUCT_TYPE ? state : null;
        return s ? selector(s) : fallbackValue;
    };
}

export const selectChars = customProductSelector(state => state.chars.values, {});
export const selectLoading = customProductSelector(state => state.loading, false);
