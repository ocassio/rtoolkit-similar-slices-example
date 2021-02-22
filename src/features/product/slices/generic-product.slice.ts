import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import { ProductSliceName, useProductActions, useProductSelectors } from "./product.slices";
import { AppThunk } from "../../../app/store";
import { AbstractProductSliceOptions, AbstractProductState } from "./abstract-product.slice";
import { createVersionFeatureSlice, VersionedState, FeatureSliceParams } from "./features/version.feature.slice";

export const GENERIC_PRODUCT_TYPE = "generic";

export interface GenericProductState extends AbstractProductState, VersionedState {
    type: typeof GENERIC_PRODUCT_TYPE;
    count: number;
}

const initialState: GenericProductState = null!!;

interface GenericProductSliceParams extends FeatureSliceParams<GenericProductState> {
    parent: AbstractProductSliceOptions;
}

export const createGenericProductSlice = ({ prefix, baseSelector, parent }: GenericProductSliceParams) => {
    
    // Actions

    const increase = createAction<number>(prefix + "/increase");

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

    const selectCount = (state: GenericProductState) => state.count;

    const selectCountX2 = createSelector(
        selectCount,
        count => count * 2
    );

    // Features

    const versionFeatureSlice = createVersionFeatureSlice({
        prefix,
        baseSelector
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
