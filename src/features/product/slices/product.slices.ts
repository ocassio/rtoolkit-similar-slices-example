import { createProductSlice, VanillaProductReducer } from "./abstract-product.slice";
import { CUSTOM_PRODUCT_TYPE } from "./custom-product.slice";
import { GENERIC_PRODUCT_TYPE } from "./generic-product.slice";

export type ProductSlice = ReturnType<typeof createProductSlice>;
export enum ProductSliceName {
    PRODUCT = "product",
    POPUP_PRODUCT = "popupProduct",
    ONE_MORE_PRODUCT = "oneMoreProduct"
}

export type ProductType = typeof GENERIC_PRODUCT_TYPE | typeof CUSTOM_PRODUCT_TYPE;

type ProductSlices = Record<ProductSliceName, ProductSlice>;

let slices: ProductSlices | null = null;
const createSlices = (): ProductSlices => ({
    product: createProductSlice(ProductSliceName.PRODUCT, {
        type: GENERIC_PRODUCT_TYPE,
        id: "1",
        name: "Product 1",
        count: 1
    }),
    popupProduct: createProductSlice(ProductSliceName.POPUP_PRODUCT, {
        type: GENERIC_PRODUCT_TYPE,
        id: "2",
        name: "Product 2",
        count: -12
    }),
    oneMoreProduct: createProductSlice(ProductSliceName.ONE_MORE_PRODUCT, {
        type: CUSTOM_PRODUCT_TYPE,
        id: "3",
        name: "Product 3",
        chars: {},
        loading: false
    })
});

export const productSlice = (name: ProductSliceName): ProductSlice => {
    if (!slices) {
        slices = createSlices();
    }

    return slices[name];
};

export const productReducer = (name: ProductSliceName): VanillaProductReducer => productSlice(name).reducer;

export const useProductActions = (name: ProductSliceName) => productSlice(name).actions;
export const useProductSelectors = (name: ProductSliceName) => productSlice(name).selectors;
