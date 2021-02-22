import { createProductSlice, VanillaProductReducer } from "./abstract-product.slice";
import { CUSTOM_PRODUCT_TYPE } from "./custom-product.slice";
import { GENERIC_PRODUCT_TYPE } from "./generic-product.slice";

export type ProductSlice = ReturnType<typeof createProductSlice>;
export type ProductSliceName = string;
export enum ProductSliceNames {
    PRODUCT = "product",
    POPUP_PRODUCT = "popupProduct",
    ONE_MORE_PRODUCT = "oneMoreProduct"
}

export type ProductType = typeof GENERIC_PRODUCT_TYPE | typeof CUSTOM_PRODUCT_TYPE;

type ProductSlices = Record<ProductSliceName, ProductSlice>;

let slices: ProductSlices | null = null;
const createSlices = (): ProductSlices => ({
    product: createProductSlice({
        prefix: ProductSliceNames.PRODUCT,
        baseSelector: state => state.product,
        initialState: {
            type: GENERIC_PRODUCT_TYPE,
            id: "1",
            name: "Product 1",
            count: 1,
            version: 0
        }
    }),
    popupProduct: createProductSlice({
        prefix: ProductSliceNames.POPUP_PRODUCT,
        baseSelector: state => state.popupProduct,
        initialState: {
            type: GENERIC_PRODUCT_TYPE,
            id: "2",
            name: "Product 2",
            count: -12,
            version: 12
        }
    }),
    oneMoreProduct: createProductSlice({
        prefix: ProductSliceNames.ONE_MORE_PRODUCT,
        baseSelector: state => state.oneMoreProduct,
        initialState: {
            type: CUSTOM_PRODUCT_TYPE,
            id: "3",
            name: "Product 3",
            version: 1,
            chars: {
                values: {},
                version: 7
            },
            loading: false
        }
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
