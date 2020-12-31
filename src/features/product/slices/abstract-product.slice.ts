import { createCustomProductSlice, CustomProductState, CUSTOM_PRODUCT_TYPE } from "./custom-product.slice";
import { createGenericProductSlice, GenericProductState, GENERIC_PRODUCT_TYPE } from "./generic-product.slice";
import { produce } from "immer";
import { ActionCreatorWithOptionalPayload, AnyAction, createAction } from "@reduxjs/toolkit";
import { RootSelector, RootState } from "../../../app/store";
import { ProductSliceName } from "./product.slices";

export interface AbstractProductState {
    id: string;
    name: string;
}

export type ProductState = GenericProductState | CustomProductState | null | undefined;

export type VanillaProductReducer<T = ProductState> = (state: T, action: AnyAction) => ProductState;
export type ProductReducer<T = ProductState> = (state: T, action: AnyAction) => ProductState | void;

export interface AbstractProductSliceOptions {
    actions: {
        setProduct: ActionCreatorWithOptionalPayload<ProductState>;
    };
    selectors: {
        selectProduct: RootSelector<ProductState>;
        selectName: RootSelector<string | undefined>;
    }
}

export const createProductSlice = (sliceName: ProductSliceName, initialState: ProductState = null) => {

    // Actions

    const setProduct = createAction<ProductState>(sliceName + "/set");

    // Selectors

    const selectProduct = (state: RootState) => state[sliceName];
    const selectName = (state: RootState) => state[sliceName]?.name;

    // Children

    const options: AbstractProductSliceOptions = {
        actions: {
            setProduct
        },
        selectors: {
            selectProduct,
            selectName
        }
    }

    const genericProductSlice = createGenericProductSlice(sliceName, options);
    const customProductSlice = createCustomProductSlice(sliceName);

    
    // Reducer

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
            ...options.actions
        },
        selectors: {
            ...genericProductSlice.selectors,
            ...customProductSlice.selectors,
            ...options.selectors
        }
    };
};
