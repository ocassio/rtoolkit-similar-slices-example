import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../../../app/store";
import { WithProductMeta } from "../../product.hooks";

export type VersionState = {
    value: number;
};

const initialState: VersionState = {
    value: 0
};

export const loadVersion = createAsyncThunk(
    "product/feature/version/load",
    (arg: WithProductMeta<{}, VersionState> | undefined, thunkApi) => {

        // --- Accessing state from thunk example
        const selector = arg?.meta?.selector;
        const state = thunkApi.getState() as RootState;
        const version = selector && selector(state);

        console.log(version);
        // -------

        return new Promise<number>(resolve => {
            setTimeout(() => resolve(50), 2000);
        });
    }
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
