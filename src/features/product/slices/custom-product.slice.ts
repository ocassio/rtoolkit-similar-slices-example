import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AbstractProductState, StandaloneProductState } from "./abstract-product.slice";
import { selectVersionValue, versionFeatureReducer, VersionState } from "./features/version.feature.slice";
import { createProductFeatureReducer } from "./product.slices";

export const CUSTOM_PRODUCT_TYPE = "custom";

export interface CustomProductState extends AbstractProductState {
    type: typeof CUSTOM_PRODUCT_TYPE;
    version: VersionState;
    chars: {
        values: Record<string, string>;
        version: VersionState;
    }
    loading: boolean;
}

const initialState: CustomProductState = null!!;

// Product async thunks have one restriction:
// If they are accepting an argument, it should be an object without meta field,
// so the meta data could be attached without hurting an original value.
// Example:
// Instead of `(id: string) => SomeProduct` you should use `({ id: string }) => SomeProduct`.
export const loadChars = createAsyncThunk(
    "product/custom/loadChars",
    () => new Promise<Record<string, string>>(resolve => {
        setTimeout(
            () => resolve({
                "Server Char 1": "Value 1",
                "Server Char 2": "Value 2"
            }),
            2000
        )
    })
);

const versionReducer = createProductFeatureReducer({
    caseName: "version",
    reducer: versionFeatureReducer,
    initialState: {
        value: 0
    }
});

const charsVersionReducer = createProductFeatureReducer({
    caseName: "charsVersion",
    reducer: versionFeatureReducer,
    initialState: {
        value: 0
    }
});

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
            versionReducer(state.version, action);
            charsVersionReducer(state.chars.version, action);
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
export const selectVersion = customProductSelector(state => selectVersionValue(state.version), 0);
export const selectCharsVersion = customProductSelector(state => selectVersionValue(state.chars.version), 0);
