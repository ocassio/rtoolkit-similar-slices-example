import { createCustomProductSlice, CustomProductState, CUSTOM_PRODUCT_TYPE } from "./custom-product.slice";
import { createGenericProductSlice, GenericProductState, GENERIC_PRODUCT_TYPE } from "./generic-product.slice";
import { produce } from "immer";
import { AnyAction, createAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { ProductSliceName } from "./product.slices";

export interface AbstractProductState {
    id: string;
    name: string;
}

export type ProductState = GenericProductState | CustomProductState | null | undefined;

export type VanillaProductReducer<T = ProductState> = (state: T, action: AnyAction) => ProductState;
export type ProductReducer<T = ProductState> = (state: T, action: AnyAction) => ProductState | void;

export const createProductSlice = (sliceName: ProductSliceName, initialState: ProductState = null) => {

    const genericProductSlice = createGenericProductSlice(sliceName);
    const customProductSlice = createCustomProductSlice(sliceName);

    const setProduct = createAction<ProductState>(sliceName + "/set");

    const selectProduct = (state: RootState) => state[sliceName];
    const selectName = (state: RootState) => state[sliceName]?.name;

    const reducer: VanillaProductReducer = (state = initialState, action) => {
        return produce(state, draft => {
            if (setProduct.match(action)) {
                return action.payload;
            }
    
            switch (draft?.type) {
                case GENERIC_PRODUCT_TYPE:
                    return genericProductSlice.reducer(draft, action);
                case CUSTOM_PRODUCT_TYPE:
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
        },
        selectors: {
            ...genericProductSlice.selectors,
            ...customProductSlice.selectors,
            selectProduct,
            selectName
        }
    };
};
