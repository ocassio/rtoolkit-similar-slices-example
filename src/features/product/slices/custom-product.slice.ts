import { createAction, createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { ProductSliceName, useProductActions, useProductSelectors } from "./product.slices";
import { RootState } from "../../../app/store";
import { AbstractProductState } from "./abstract-product.slice";
import { createVersionFeatureSlice } from "./features/version.feature.slice";

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

    const selectChars = customProductSelector(state => state.chars.values, {});
    const selectLoading = customProductSelector(state => state.loading, false);

    // Features

    const versionFeatureSlice = createVersionFeatureSlice({
        prefix: sliceName,
        baseSelector: customProductSelector(s => s, null)
    });

    const charsVersionFeatureSlice = createVersionFeatureSlice({
        prefix: sliceName + "/chars",
        baseSelector: customProductSelector(s => s.chars, null)
    });

    // Reducer

    const reducer = createReducer(initialState, builder => {
        builder.addCase(setChar, (state, action) => {
            const { name, value } = action.payload;
            state.chars.values[name] = value;
        });

        builder.addCase(loadChars.pending, state => {
            state.loading = true;
        });

        builder.addCase(loadChars.fulfilled, (state, action) => {
            state.chars.values = action.payload;
            state.loading = false;
        });

        builder.addDefaultCase((state, action) => {
            versionFeatureSlice.reducer(state, action);
            charsVersionFeatureSlice.reducer(state.chars, action);
        });
    });

    return {
        reducer,
        actions: {
            ...versionFeatureSlice.actions,
            setChar,
            loadChars,
            chars: charsVersionFeatureSlice.actions
            // Another option:
            // nextCharsVersion: charsVersionFeatureSlice.actions.nextVersion
        },
        selectors: {
            ...versionFeatureSlice.selectors,
            selectChars,
            selectLoading,
            chars: charsVersionFeatureSlice.selectors
            // Another option:
            // selectCharsVersion: charsVersionFeatureSlice.selectors.selectVersion
        }
    };
} 

export const useCustomProductActions = (name: ProductSliceName) => useProductActions(name).custom;
export const useCustomProductSelectors = (name: ProductSliceName) => useProductSelectors(name).custom;
