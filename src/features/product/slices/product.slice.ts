import { AnyAction, createAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { createCustomProductSlice, CustomProductState } from "./custom-product.slice";
import { createGenericProductSlice, GenericProductState } from "./generic-product.slice";

export interface AbstractProductState {
    id: string;
    name: string;
}

export type ProductState = GenericProductState | CustomProductState | null;

const createProductSlice = (name: string, initialState: ProductState = null) => {

    const prefix = name + "/";

    const genericProductSlice = createGenericProductSlice(prefix);
    const customProductSlice = createCustomProductSlice(prefix);

    const setProduct = createAction<ProductState>(prefix + "set");

    const reducer = (state: ProductState = initialState, action: AnyAction): ProductState => {
        if (setProduct.match(action)) {
            return action.payload;
        }

        switch (state?.type) {
            case "generic":
                return genericProductSlice.reducer(state, action);
            case "custom":
                return customProductSlice.reducer(state, action);
        }

        return state;
    }

    return {
        reducer,
        actions: {
            ...genericProductSlice.actions,
            ...customProductSlice.actions,
            setProduct
        }
    };
};

type ProductSlice = ReturnType<typeof createProductSlice>;
interface ProductSlices {
    product: ProductSlice;
    popupProduct: ProductSlice;
    oneMoreProduct: ProductSlice;
}
export type ProductSliceName = keyof ProductSlices;

let slices: ProductSlices | null = null;
const createSlices = (): ProductSlices => ({
    product: createProductSlice("product", {
        type: "generic",
        id: "1",
        name: "Product 1",
        count: 1
    }),
    popupProduct: createProductSlice("popupProduct", {
        type: "generic",
        id: "2",
        name: "Product 2",
        count: -12
    }),
    oneMoreProduct: createProductSlice("oneMoreProduct", {
        type: "custom",
        id: "3",
        name: "Product 3",
        chars: {}
    })
});

export const productSlice = (name: ProductSliceName) => {
    if (!slices) {
        slices = createSlices();
    }

    return slices[name];
};


export const productReducer = (name: ProductSliceName) => productSlice(name).reducer;

export const setProduct = (name: ProductSliceName) => productSlice(name).actions.setProduct;

export const selectName = (name: ProductSliceName) => (state: RootState) => state[name]?.name;
