import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch, useCallback, useContext } from "react";
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
    const bunldeProductId = useContext(BundleProductContext);
    
    return useCallback((action: AnyAction) => {
        action.meta = Object.assign(action.meta || {}, {
            slice,
            bunldeProductId
        });
        dispatch(action);
    }, [dispatch, slice, bunldeProductId])
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