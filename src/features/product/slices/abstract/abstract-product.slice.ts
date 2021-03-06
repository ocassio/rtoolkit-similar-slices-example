import { customProductReducer, CustomProductState, CUSTOM_PRODUCT_TYPE } from "../custom/custom-product.slice";
import { genericProductReducer, GenericProductState, GENERIC_PRODUCT_TYPE } from "../generic/generic-product.slice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductMeta } from "../product.hooks";

export interface AbstractProductState {
    id: string;
    name: string;
    type: string;
}

export type ProductState = GenericProductState | CustomProductState;
export type StandaloneProductState = ProductState | null | undefined;

const initialState: StandaloneProductState = null;

const slice = createSlice({
    name: "product",
    initialState: initialState as StandaloneProductState,
    reducers: {
        setProduct: {
            reducer(_state, action: PayloadAction<StandaloneProductState>) {
                return action.payload;
            },
            prepare(product: StandaloneProductState, meta?: ProductMeta) {
                return {
                    payload: product,
                    meta
                }
            }
        }
    },
    extraReducers: builder => {
        builder.addDefaultCase((state, action) => {
            switch (state?.type) {
                case GENERIC_PRODUCT_TYPE:
                    return genericProductReducer(state, action);
                case CUSTOM_PRODUCT_TYPE:
                    return customProductReducer(state, action);
            }
        });
    }
});

export const { setProduct } = slice.actions;

export const productReducer = slice.reducer;

export const selectProduct = (state: StandaloneProductState) => state;
export const selectName = (state: StandaloneProductState) => state?.name;
export const selectType = (state: StandaloneProductState) => state?.type;
