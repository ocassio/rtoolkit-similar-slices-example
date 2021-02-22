import { createEntityAdapter, createSlice, EntityId, EntityState, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { v4 as uuid } from "uuid";

interface PocProductState {
    id: string;
    name: string;
}

const pocProductInitialState: PocProductState = {
    id: "none",
    name: "none"
}

const productSlice = createSlice({
    name: 'pocProduct',
    initialState: pocProductInitialState,
    reducers: {
        setName(state, action: PayloadAction<string>) {
            state.name = action.payload;
        }
    }
});

export const { setName } = productSlice.actions;

export const selectProductId = (state: PocProductState) => state.id;
export const selectProductName = (state: PocProductState) => state.name;

export interface BundleState {
    id: string;
    name: string;
    products: EntityState<PocProductState>;
}

const productsAdapter = createEntityAdapter<PocProductState>();

const initialState: BundleState = {
    id: 'bundle-1',
    name: "Test Bundle",
    products: {
        ids: ["p1", "p2"],
        entities: {
            "p1": {
                id: "p1",
                name: "Product 1"
            },
            "p2": {
                id: "p2",
                name: "Product 2"
            }
        }
    }
};

const slice = createSlice({
    name: "bundle",
    initialState,
    reducers: {
        addProduct(state) {
            const id = uuid();
            productsAdapter.addOne(state.products, {
                id,
                name: `Product ${id}`
            })
        }
    },
    extraReducers: builder => {
        builder.addMatcher(
            action => action.type.startsWith('pocProduct/'),
            (state, action) => {
                const id: EntityId = action.meta.id;
                
                let product = state.products.entities[id];
                product = productSlice.reducer(product, action);
                
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

export const useBundleProductSelector = <T> (id: EntityId, selector: (state: PocProductState) => T) =>
    useSelector((state: RootState) => {
        const product = selectById(state, id);
        return product ? selector(product) : null;
    });

export const useBundleProductDispatch = (id: EntityId): Dispatch<any> => {
    const dispatch = useDispatch();
    return useCallback((action) => {
        action.meta = Object.assign(action.meta || {}, { id });
        dispatch(action);
    }, [id, dispatch])
}
