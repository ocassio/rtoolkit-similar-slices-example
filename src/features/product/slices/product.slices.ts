import { AnyAction, Reducer } from "@reduxjs/toolkit";
import { productReducer, StandaloneProductState } from "./abstract-product.slice";

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

export interface ProductFeatureReducerParams<State> {
    caseName: string,
    initialState: State,
    reducer: Reducer<State, AnyAction>
}

export const createProductFeatureReducer = <State> ({
    caseName,
    initialState,
    reducer
}: ProductFeatureReducerParams<State>): Reducer<State, AnyAction> => {
    return (state = initialState, action) => {
        if (action.meta?.featureCase === caseName || action.meta?.arg?.meta?.featureCase === caseName) {
            return reducer(state, action);
        }
        return state;
    }
}
