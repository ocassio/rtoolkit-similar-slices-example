import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { AbstractProductState, StandaloneProductState } from "./abstract-product.slice";
import { servicesFeatureReducer, ServicesState } from "./features/services/services.feature.slice";
import { versionFeatureReducer, VersionState } from "./features/version/version.feature.slice";
import { WithProductMeta } from "./product.hooks";
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
    services: ServicesState;
}

const initialState: CustomProductState = null!!;

// Product async thunks have one restriction:
// If they are accepting an argument, it should be an object without meta field,
// so the meta data could be attached without hurting the original value.
// Example:
// Instead of `(id: string) => SomeProduct` you should use `({ id: string }) => SomeProduct`.
export const loadChars = createAsyncThunk(
    "product/custom/loadChars",
    (arg: WithProductMeta<{}, CustomProductState> | undefined, thunkApi) => new Promise<Record<string, string>>(resolve => {
        
        // --- Accessing state from thunk example
        const selector = arg?.meta?.selector;
        const state = thunkApi.getState() as RootState;
        const product = selector && selector(state);

        console.log(product);
        // -------
        
        setTimeout(
            () => resolve({
                "Server Char 1": "Value 1",
                "Server Char 2": "Value 2"
            }),
            2000
        )
    })
);

export const CUSTOM_VERSION_CASE = "customVersion";
const versionReducer = createProductFeatureReducer({
    caseName: CUSTOM_VERSION_CASE,
    reducer: versionFeatureReducer,
    initialState: {
        value: 0
    }
});

export const CUSTOM_CHARS_VERSION_CASE = "customCharsVersion";
const charsVersionReducer = createProductFeatureReducer({
    caseName: CUSTOM_CHARS_VERSION_CASE,
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
            servicesFeatureReducer(state.services, action);
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

export const CUSTOM_SERVICES_CASE = "customServices";
export const customProductFeatureCaseSelectors = {
    [CUSTOM_VERSION_CASE]: customProductSelector(state => state.version, null),
    [CUSTOM_CHARS_VERSION_CASE]: customProductSelector(state => state.chars.version, null),
    [CUSTOM_SERVICES_CASE]: customProductSelector(state => state.services, null)
}
