import { createCustomProductSlice, CustomProductState, CUSTOM_PRODUCT_TYPE } from "./custom-product.slice";
import { createGenericProductSlice, GenericProductState, GENERIC_PRODUCT_TYPE } from "./generic-product.slice";
import { ActionCreatorWithOptionalPayload, AnyAction, createAction, createReducer } from "@reduxjs/toolkit";
import { RootSelector, RootState } from "../../../app/store";
import { FeatureSliceParams } from "./features/version.feature.slice";

export interface AbstractProductState {
    id: string;
    name: string;
}

export type ProductState = GenericProductState | CustomProductState;
export type StandaloneProductState = ProductState | null | undefined;

export type VanillaProductReducer<T = StandaloneProductState> = (state: T, action: AnyAction) => StandaloneProductState;

export interface AbstractProductSliceOptions {
    actions: {
        setProduct: ActionCreatorWithOptionalPayload<StandaloneProductState>;
    };
    selectors: {
        selectProduct: RootSelector<StandaloneProductState>;
        selectName: RootSelector<string | undefined>;
    }
}

export const createProductSlice = ({ prefix, baseSelector, initialState }: FeatureSliceParams<StandaloneProductState>) => {

    // Actions

    const setProduct = createAction<StandaloneProductState>(prefix + "/set");

    // Selectors

    const selectProduct = baseSelector;
    const selectName = (state: RootState) => baseSelector(state)?.name;

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

    const genericProductSlice = createGenericProductSlice({
        prefix,
        baseSelector: state => baseSelector(state) as GenericProductState,
        parent: options
    });
    const customProductSlice = createCustomProductSlice({
        prefix,
        baseSelector: state => baseSelector(state) as CustomProductState,
        parent: options
    });

    
    // Reducer

    const reducer = createReducer(initialState, builder => {
       
        builder.addCase(setProduct, (_state, action) => {
            return action.payload;
        });

        builder.addDefaultCase((state, action) => {
            switch (state?.type) {
                case GENERIC_PRODUCT_TYPE:
                    return genericProductSlice.reducer(state, action);
                case CUSTOM_PRODUCT_TYPE:
                    return customProductSlice.reducer(state, action);
            }
        });
    });

    return {
        reducer,
        actions: {
            generic: genericProductSlice.actions,
            custom: customProductSlice.actions,
            ...options.actions
        },
        selectors: {
            generic: genericProductSlice.selectors,
            custom: customProductSlice.selectors,
            ...options.selectors
        }
    };
};
