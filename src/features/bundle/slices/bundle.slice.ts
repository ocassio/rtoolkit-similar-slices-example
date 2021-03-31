import { createEntityAdapter, createSlice, EntityId, EntityState } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { v4 as uuid } from "uuid";
import { StandaloneProductState } from "../../product/slices/abstract/abstract-product.slice";
import { GENERIC_PRODUCT_TYPE } from "../../product/slices/generic/generic-product.slice";
import { createProductReducer, ProductSliceNames } from "../../product/slices/product.slices";

export interface BundleState {
    id: string;
    name: string;
    products: EntityState<StandaloneProductState>;
}

const productsAdapter = createEntityAdapter<StandaloneProductState>();

const initialState: BundleState = {
    id: 'bundle-1',
    name: "Test Bundle",
    products: {
        ids: ["p1", "p2"],
        entities: {}
    }
};

const bundleProductReducer = createProductReducer(ProductSliceNames.BUNDLE);

const slice = createSlice({
    name: "bundle",
    initialState,
    reducers: {
        addProduct(state) {
            const id = uuid();
            productsAdapter.addOne(state.products, {
                id,
                name: `Product ${id}`,
                type: GENERIC_PRODUCT_TYPE,
                count: 0,
                version: {
                    value: 0
                },
                services: {
                    services: {
                      ids: [],
                      entities: {}
                    }
                },
                equipment: {
                    ids: ["e1", "e2"],
                    entities: {
                        "e1": {
                            id: "e1",
                            name: "Equipment 1",
                            services: {
                                services: {
                                  ids: [],
                                  entities: {}
                                }
                            },
                        },
                        "e2": {
                            id: "e2",
                            name: "Equipment 2",
                            services: {
                                services: {
                                  ids: [],
                                  entities: {}
                                }
                            },
                        }
                    }
                }
            })
        }
    },
    extraReducers: builder => {
        builder.addMatcher(
            action => action.type.startsWith('product/'),
            (state, action) => {
                const id: EntityId = action.meta?.bundleProductId ?? action.meta?.arg?.meta?.bundleProductId;
                if (!id) {
                    return;
                }
                
                let product = state.products.entities[id];
                product = bundleProductReducer(product, action);
                
                productsAdapter.updateOne(state.products, {
                    id,
                    changes: product
                });
            }
        )
    }
});

export const { addProduct } = slice.actions;

export const bunldeReducer = slice.reducer;

export const selectBundleId = (state: RootState) => state.bundle.id;
export const selectBundleName = (state: RootState) => state.bundle.name;

const { selectById, selectIds } = productsAdapter.getSelectors((state: RootState) => state.bundle.products);
export const selectBundleProductIds = selectIds;
export const selectBundleProductById = selectById;
