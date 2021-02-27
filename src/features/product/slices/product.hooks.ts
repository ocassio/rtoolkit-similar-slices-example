import { AnyAction, AsyncThunk, EntityId } from "@reduxjs/toolkit";
import { Dispatch, useCallback, useContext, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { BundleProductContext } from "../../bundle/bundle-product.context";
import { selectBundleProductById } from "../../bundle/slices/bundle.slice";
import { ProductContext } from "../product.context";
import { StandaloneProductState } from "./abstract-product.slice";
import { ProductSliceNames } from "./product.slices";

const PRODUCT_SLICE_SELECTORS = {
    product: (state: RootState) => state.product,
    popupProduct: (state: RootState) => state.popupProduct,
    oneMoreProduct: (state: RootState) => state.oneMoreProduct,
    bundle: selectBundleProductById
}

export const useProductDispatch = (): Dispatch<any> => {
    const dispatch = useDispatch();
    const slice = useContext(ProductContext);
    const bundleProductId = useContext(BundleProductContext);
    
    return useCallback((action: AnyAction) => {
        action.meta = Object.assign(action.meta || {}, {
            slice,
            bunldeProductId: bundleProductId
        });
        dispatch(action);
    }, [dispatch, slice, bundleProductId])
}

export const useProductSelector = <T> (selector: (state: StandaloneProductState) => T): T => {
    const sliceName = useContext(ProductContext);
    const productId = useContext(BundleProductContext);

    return useSelector((state: RootState) => {
        const product = sliceName === ProductSliceNames.BUNDLE
            ? PRODUCT_SLICE_SELECTORS[ProductSliceNames.BUNDLE](state, productId)
            : PRODUCT_SLICE_SELECTORS[sliceName](state);
        return selector(product);
    });
}

interface WithProductMeta {
    meta: {
        slice: ProductSliceNames;
        bundleProductId?: EntityId;
    }
}

export const useProductThunk = <Returned, ThunkArg, ThunkApiConfig> (
    thunk: AsyncThunk<Returned, ThunkArg, ThunkApiConfig>
): AsyncThunk<Returned, ThunkArg, ThunkApiConfig> => {
    const slice = useContext(ProductContext);
    const bundleProductId = useContext(BundleProductContext);

    return useMemo(() => {
        const actionCreator = ((arg: ThunkArg) => {
            const meta: WithProductMeta = {
                meta: {
                    slice,
                    bundleProductId
                }
            };
            const argWithMeta: ThunkArg & WithProductMeta = Object.assign({}, arg, meta);
    
            return thunk(argWithMeta);
        }) as AsyncThunk<Returned, ThunkArg, ThunkApiConfig>;
    
        Object.assign(actionCreator, thunk);
    
        return actionCreator;
    }, [thunk, slice, bundleProductId]);
}
