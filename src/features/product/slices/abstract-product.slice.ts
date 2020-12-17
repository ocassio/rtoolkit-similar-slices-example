import { createCustomProductSlice, CustomProductState } from "./custom-product.slice";
import { createGenericProductSlice, GenericProductState } from "./generic-product.slice";
import { produce } from "immer";
import { AnyAction, createAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { ProductSliceName, productSlice } from "./product.slices";

export interface AbstractProductState {
    id: string;
    name: string;
}

export type ProductState = GenericProductState | CustomProductState | null | undefined;
export type ProductReducer<T = ProductState> = (state: T, action: AnyAction) => ProductState | void;

export const createProductSlice = (name: string, initialState: ProductState = null) => {

    const prefix = name + "/";

    const genericProductSlice = createGenericProductSlice(prefix);
    const customProductSlice = createCustomProductSlice(prefix);

    const setProduct = createAction<ProductState>(prefix + "set");

    const reducer = (state: ProductState = initialState, action: AnyAction): ProductState => {
        return produce(state, draft => {
            if (setProduct.match(action)) {
                return action.payload;
            }
    
            switch (draft?.type) {
                case "generic":
                    return genericProductSlice.reducer(draft, action);
                case "custom":
                    return customProductSlice.reducer(draft, action);
            }
        });
    }

    return {
        reducer,
        actions: {
            ...genericProductSlice.actions,
            ...customProductSlice.actions,
            setProduct
        }
    };
};

export const setProduct = (name: ProductSliceName) => productSlice(name).actions.setProduct;

export const selectName = (name: ProductSliceName) => (state: RootState) => state[name]?.name;
