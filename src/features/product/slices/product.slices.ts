import { AnyAction, Reducer } from "@reduxjs/toolkit";
import { productReducer, StandaloneProductState } from "./abstract-product.slice";

export type ProductSliceName = string;
export enum ProductSliceNames {
    PRODUCT = "product",
    POPUP_PRODUCT = "popupProduct",
    ONE_MORE_PRODUCT = "oneMoreProduct"
}

export const createProductReducer = (sliceName: ProductSliceNames): Reducer<StandaloneProductState, AnyAction> => {
    return (state = null, action) => {
        if (action.meta?.slice === sliceName) {
            return productReducer(state, action);
        }
        return state;
    }
}
