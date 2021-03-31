import { AppThunk } from "../../../../app/store";
import { setProduct } from "../abstract/abstract-product.slice";
import { WithProductMeta } from "../product.hooks";
import { GenericProductState, GENERIC_PRODUCT_TYPE } from "./generic-product.slice";

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
                },
                equipment: {
                    ids: [],
                    entities: {}
                }
            };
            dispatch(setProduct(product, arg?.meta));
        },
        3000
    )
}
