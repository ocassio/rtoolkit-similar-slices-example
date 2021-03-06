import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../../app/store";
import { AbstractProductState, setProduct, StandaloneProductState } from "./abstract-product.slice";
import { servicesFeatureReducer, ServicesState } from "./features/services/services.feature.slice";
import { versionFeatureReducer, VersionState } from "./features/version/version.feature.slice";
import { WithProductMeta } from "./product.hooks";

export const GENERIC_PRODUCT_TYPE = "generic";

export interface GenericProductState extends AbstractProductState {
    type: typeof GENERIC_PRODUCT_TYPE;
    count: number;
    version: VersionState;
    services: ServicesState;
}

const initialState: GenericProductState = null!!;

// If you are writing custom thunks, you should handle passing meta data to dispatched actions manually.
export const loadProduct = (arg?: WithProductMeta): AppThunk => dispatch => {
    setTimeout(
        () => {
            const product: GenericProductState = {
                type: GENERIC_PRODUCT_TYPE,
                id: "456",
                name: "Loaded Product",
                count: 12,
                version: {
                    value: 0
                },
                services: {
                    services: {
                        ids: [],
                        entities: {}
                    }
                }
            };
            dispatch(setProduct(product, arg?.meta));
        },
        3000
    )
}

const slice = createSlice({
    name: "product/generic",
    initialState,
    reducers: {
        increase(state, action: PayloadAction<number>) {
            state.count += action.payload;
        }
    },
    extraReducers(builder) {
        builder.addDefaultCase((state, action) => {
            versionFeatureReducer(state.version, action);
            servicesFeatureReducer(state.services, action);
        });
    }
});

export const { increase } = slice.actions;

export const genericProductReducer = slice.reducer;

const genericProductSelector = <T> (selector: (state: GenericProductState) => T, fallbackValue: T): (state: StandaloneProductState) => T => {
    return (state: StandaloneProductState) => {
        const s = state?.type === GENERIC_PRODUCT_TYPE ? state : null;
        return s ? selector(s) : fallbackValue;
    };
}

export const selectCount = genericProductSelector(state => state.count, 0);

export const selectCountX2 = createSelector(
    selectCount,
    count => count * 2
);

export const GENERIC_VERSION_CASE = "genericVersion";
export const GENERIC_SERVICES_CASE = "genericServices";

export const genericProductFeatureCaseSelectors = {
    [GENERIC_VERSION_CASE]: genericProductSelector(state => state.version, null),
    [GENERIC_SERVICES_CASE]: genericProductSelector(state => state.services, null)
}
