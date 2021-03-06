import { AnyAction, Reducer } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { productReducer, StandaloneProductState } from "./abstract/abstract-product.slice";
import { WithProductMeta } from "./product.hooks";

export type ProductSliceName = string;
export enum ProductSliceNames {
    PRODUCT = "product",
    POPUP_PRODUCT = "popupProduct",
    ONE_MORE_PRODUCT = "oneMoreProduct",
    BUNDLE = "bundle"
}

export const createProductReducer = (sliceName: ProductSliceNames): Reducer<StandaloneProductState, AnyAction> => {
    return (state = null, action) => {
        if (action.meta?.slice === sliceName || action.meta?.arg?.meta?.slice === sliceName) {
            return productReducer(state, action);
        }
        return state;
    }
}

interface ThunkApi {
    getState: () => unknown;
}

export function getScopedState<State>(arg: WithProductMeta<any, State> | undefined, thunkApi: ThunkApi) {
    const selector = arg?.meta?.selector;
    const state = thunkApi.getState() as RootState;

    return selector && selector(state);
}
