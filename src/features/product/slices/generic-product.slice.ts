import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import { ProductSliceName, useProductActions, useProductSelectors } from "./product.slices";
import { AppThunk, RootState } from "../../../app/store";
import { AbstractProductSliceOptions, AbstractProductState } from "./abstract-product.slice";
import { createVersionFeatureSlice, VersionedState } from "./features/version.feature.slice";

export const GENERIC_PRODUCT_TYPE = "generic";

export interface GenericProductState extends AbstractProductState, VersionedState {
    type: typeof GENERIC_PRODUCT_TYPE;
    count: number;
}

const initialState: GenericProductState = null!!;

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
                    count: 12,
                    version: 0
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

    // Features

    const versionFeatureSlice = createVersionFeatureSlice({
        prefix: sliceName,
        baseSelector: state => {
            const s = state[sliceName];
            return s?.type === GENERIC_PRODUCT_TYPE ? s : null;
        }
    });

    // Reducer

    const reducer = createReducer(initialState, builder => {
        builder.addCase(increase, (state, action) => {
            state.count += action.payload;
        });

        builder.addDefaultCase((state, action) => {
            versionFeatureSlice.reducer(state, action);
        });
    });

    return {
        reducer,
        actions: {
            ...versionFeatureSlice.actions,
            increase,
            loadProduct,
        },
        selectors: {
            ...versionFeatureSlice.selectors,
            selectCount,
            selectCountX2
        }
    };
}

export const useGenericProductActions = (name: ProductSliceName) => useProductActions(name).generic;
export const useGenericProductSelectors = (name: ProductSliceName) => useProductSelectors(name).generic;
