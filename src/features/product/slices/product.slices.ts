import { createProductSlice } from "./abstract-product.slice";

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
