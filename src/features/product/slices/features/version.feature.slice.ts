import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
