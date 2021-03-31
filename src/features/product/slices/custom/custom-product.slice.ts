import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AbstractProductState } from "../abstract/abstract-product.slice";
import { ServicesState } from "../features/services/services.feature.slice";
import { VersionState } from "../features/version/version.feature.slice";
import { loadChars } from "./custom-product.thunks";
import { customCharsVersionReducer } from "./features/custom-product-chars-version.feature.slice";
import { customServicesReducer } from "./features/custom-product-services.feature.slice";
import { customVersionReducer } from "./features/custom-product-version.feature.slice";

export const CUSTOM_PRODUCT_TYPE = "custom";

export interface CustomProductState extends AbstractProductState {
    type: typeof CUSTOM_PRODUCT_TYPE;
    version: VersionState;
    chars: {
        values: Record<string, string>;
        version: VersionState;
    }
    loading: boolean;
    services: ServicesState;
}

const initialState: CustomProductState = null!!;

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

        builder.addDefaultCase((state, action) => {
            customVersionReducer(state, action);
            customCharsVersionReducer(state, action);
            customServicesReducer(state, action);
        });
    }
});

export const { setChar } = slice.actions;

export const customProductReducer = slice.reducer;