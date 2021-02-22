import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch, useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootSelector, RootState } from "../../../app/store";
import { ProductContext } from "../product.context";
import { StandaloneProductState } from "./abstract-product.slice";
import { ProductSliceNames } from "./product.slices";

const PRODUCT_SLICE_SELECTORS: Record<ProductSliceNames, RootSelector<StandaloneProductState>> = {
    product: state => state.product,
    popupProduct: state => state.popupProduct,
    oneMoreProduct: state => state.oneMoreProduct
}

export const useProductDispatch = (): Dispatch<any> => {
    const dispatch = useDispatch();
    const sliceName = useContext(ProductContext);
    
    return useCallback((action: AnyAction) => {
        action.meta = Object.assign(action.meta || {}, { slice: sliceName });
        dispatch(action);
    }, [dispatch, sliceName])
}

export const useProductSelector = <T> (selector: (state: StandaloneProductState) => T): T => {
    const sliceName = useContext(ProductContext);
    return useSelector((state: RootState) => {
        const product = PRODUCT_SLICE_SELECTORS[sliceName](state);
        return selector(product);
    });
}