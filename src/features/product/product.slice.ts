import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Product {
    id: string;
    name: string;
    count: number;
}

type ProductState = Product | null;

const createProductSlice = (name: string, initialState: ProductState = null) => createSlice({
    name,
    initialState,
    reducers: {
        setProduct(state, action: PayloadAction<ProductState>) {
            state = action.payload;
        },
        increase(state, action: PayloadAction<number>) {
            if (state) {
                state.count += action.payload;
            }
        }
    }
});

const slices = {
    product: createProductSlice("product", {
        id: "1",
        name: "Product 1",
        count: 1
    }),
    popupProduct: createProductSlice("popupProduct", {
        id: "2",
        name: "Product 2",
        count: -12
    })
}

type ProductSlices = typeof slices;
export type ProductSliceName = keyof ProductSlices;

export const productSlice = (name: ProductSliceName) => slices[name];
export const productReducer = (name: ProductSliceName) => productSlice(name).reducer;

export const setProduct = (name: ProductSliceName) => productSlice(name).actions.setProduct;
export const increase = (name: ProductSliceName) => productSlice(name).actions.increase;

export const selectName = (name: ProductSliceName) => (state: RootState) => state[name]?.name;
export const selectCount = (name: ProductSliceName) => (state: RootState) => state[name]?.count;
