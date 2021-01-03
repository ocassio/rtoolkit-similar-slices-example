import { createAction, createSelector } from "@reduxjs/toolkit";
import { ProductSliceName, useProductActions, useProductSelectors } from "./product.slices";
import { AppThunk, RootState } from "../../../app/store";
import { AbstractProductSliceOptions, AbstractProductState, ProductReducer } from "./abstract-product.slice";

export const GENERIC_PRODUCT_TYPE = "generic";

export interface GenericProductState extends AbstractProductState {
    type: typeof GENERIC_PRODUCT_TYPE;
    count: number;
}

export const createGenericProductSlice = (sliceName: ProductSliceName, parent: AbstractProductSliceOptions) => {
    
    // Actions

    const increase = createAction<number>(sliceName + "/increase");

    const loadProduct = (): AppThunk => dispatch => {
        setTimeout(
            () => {
                const product: GenericProductState = {
                    type: GENERIC_PRODUCT_TYPE,
                    id: "456",
                    name: "Loaded Product",
                    count: 12
                };
                dispatch(parent.actions.setProduct(product));
            },
            3000
        )
    }

    // Selectors

    const selectCount = (state: RootState) => {
        const s = state[sliceName];
        return s?.type === GENERIC_PRODUCT_TYPE ? s.count : 0;
    }

    const selectCountX2 = createSelector(
        selectCount,
        count => count * 2
    );

    // Reducers

    const reducer: ProductReducer<GenericProductState> = (state, action) => {
        if (increase.match(action)) {
            state.count += action.payload;
            return;
        }
    }

    return {
        reducer,
        actions: {
            increase,
            loadProduct
        },
        selectors: {
            selectCount,
            selectCountX2
        }
    };
}

export const useGenericProductActions = (name: ProductSliceName) => useProductActions(name).generic;
export const useGenericProductSelectors = (name: ProductSliceName) => useProductSelectors(name).generic;
