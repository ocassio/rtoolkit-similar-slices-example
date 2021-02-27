import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../../app/store";
import { AbstractProductState, setProduct, StandaloneProductState } from "./abstract-product.slice";
import { VersionedState } from "./features/version.feature.slice";
import { WithProductMeta } from "./product.hooks";

export const GENERIC_PRODUCT_TYPE = "generic";

export interface GenericProductState extends AbstractProductState, VersionedState {
    type: typeof GENERIC_PRODUCT_TYPE;
    count: number;
}

const initialState: GenericProductState = null!!;

// If you are writing custom thunks, you should handle passing meta data to dispatched actions manually.
export const loadProduct = (arg?: WithProductMeta): AppThunk => dispatch => {
    setTimeout(
        () => {
            const product: GenericProductState = {
                type: GENERIC_PRODUCT_TYPE,
                id: "456",
                name: "Loaded Product",
                count: 12,
                version: 0
            };
            dispatch(setProduct(product, arg?.meta));
        },
        3000
    )
}

const slice = createSlice({
    name: "product/generic",
    initialState,
    reducers: {
        increase(state, action: PayloadAction<number>) {
            state.count += action.payload;
        }
    }
});

export const { increase } = slice.actions;

export const genericProductReducer = slice.reducer;

export const selectCount = (state: StandaloneProductState) => {
    return state?.type === GENERIC_PRODUCT_TYPE ? state.count : 0;
};

export const selectCountX2 = createSelector(
    selectCount,
    count => count * 2
);
