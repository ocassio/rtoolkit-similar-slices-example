import { createAsyncThunk, createSelector, createSlice, Selector } from "@reduxjs/toolkit";
import { RootSelector, RootState } from "../../../../app/store";
import { ProductState, StandaloneProductState } from "../abstract-product.slice";

export type VersionState = {
    value: number;
};

const initialState: VersionState = {
    value: 0
};

export const loadVersion = createAsyncThunk(
    "product/feature/version/load",
    () => new Promise<number>(resolve => {
        setTimeout(() => resolve(50), 2000);
    })
)

const slice = createSlice({
    name: "product/feature/version",
    initialState,
    reducers: {
        nextVersion(state) {
            state.value++;
        }
    },
    extraReducers(builder) {
        builder.addCase(loadVersion.fulfilled, (state, action) => {
            state.value = action.payload;
        });
    }
});

export const { nextVersion } = slice.actions;

export const versionFeatureReducer = slice.reducer;

export const selectVersionValue = (state: VersionState) => state.value;
export const selectDoubledVersionValue = createSelector(
    [selectVersionValue],
    (value) => value * 2
);

// function bindFeatureSelectors<State extends StandaloneProductState>(baseSelector: RootSelector<State>, selectors: Record<string, (state: State) => any>): Record<string, (state: State) => any> {
//     return Object.keys(selectors).reduce<Record<string, (state: State) => any>>((result, key) => {
//         result[key] = (state: RootState) => {
//             const baseState = baseSelector(state);
//             if (!baseState) {
//                 return null;
//             }
//             return selectors[key](baseState);
//         }
//         return result;
//     }, {});
// }