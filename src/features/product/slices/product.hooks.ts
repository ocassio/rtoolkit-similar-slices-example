import { AnyAction, AsyncThunk, EntityId } from "@reduxjs/toolkit";
import { Dispatch, useCallback, useContext, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppThunk, RootSelector } from "../../../app/store";
import { BundleProductContext } from "../../bundle/bundle-product.context";
import { selectBundleProductById } from "../../bundle/slices/bundle.slice";
import { ProductContext } from "../product.context";
import {StandaloneProductState } from "./abstract-product.slice";
import { ProductSliceNames } from "./product.slices";

const PRODUCT_SLICE_SELECTORS = {
    product: (state: RootState) => state.product,
    popupProduct: (state: RootState) => state.popupProduct,
    oneMoreProduct: (state: RootState) => state.oneMoreProduct,
    bundle: selectBundleProductById
}

export const useProductDispatch = (featureCase?: string): Dispatch<any> => {
    const dispatch = useDispatch();
    const slice = useContext(ProductContext);
    const bundleProductId = useContext(BundleProductContext);
    
    return useCallback((action: AnyAction) => {
        const meta: ProductMeta = {
            slice,
            bundleProductId,
            featureCase
        }
        action.meta = Object.assign(action.meta || {}, meta);
        dispatch(action);
    }, [dispatch, slice, bundleProductId, featureCase])
}

export const useProductSelector = <T> (selector: (state: StandaloneProductState) => T): T => {
    const sliceName = useContext(ProductContext);
    const productId = useContext(BundleProductContext);

    return useSelector((state: RootState) => {
        const productSelector = getSelector(sliceName, productId);
        const product = productSelector(state);
        return selector(product);
    });
}

export interface ProductMeta<State = any> {
    slice: ProductSliceNames;
    bundleProductId?: EntityId;
    featureCase?: string;
    selector?: RootSelector<State>;
}

export type WithProductMeta<T extends {} = {}, State = any> = T & {
    meta: ProductMeta<State>;
}

function getSelector(sliceName: ProductSliceNames, bundleProductId?: EntityId): RootSelector<StandaloneProductState> {
    return state => {
        return sliceName === ProductSliceNames.BUNDLE
            ? PRODUCT_SLICE_SELECTORS[ProductSliceNames.BUNDLE](state, bundleProductId!!)
            : PRODUCT_SLICE_SELECTORS[sliceName](state);
    }
}

export const useProductAsyncThunk = <Returned, ThunkArg, ThunkApiConfig> (
    thunk: AsyncThunk<Returned, ThunkArg, ThunkApiConfig>,
    featureCase?: string
): AsyncThunk<Returned, ThunkArg, ThunkApiConfig> => {
    const slice = useContext(ProductContext);
    const bundleProductId = useContext(BundleProductContext);

    return useMemo(() => {
        const actionCreator = ((arg: ThunkArg) => {
            const meta: WithProductMeta = {
                meta: {
                    slice,
                    bundleProductId,
                    featureCase,
                    selector: getSelector(slice, bundleProductId)
                }
            };
            const argWithMeta: ThunkArg & WithProductMeta = Object.assign({}, arg, meta);
    
            return thunk(argWithMeta);
        }) as AsyncThunk<Returned, ThunkArg, ThunkApiConfig>;
    
        Object.assign(actionCreator, thunk);
    
        return actionCreator;
    }, [thunk, slice, bundleProductId, featureCase]);
}

export const useProductThunk = <ThunkArg> (
    actionCreator: (arg?: ThunkArg) => AppThunk,
    featureCase?: string
): (arg?: ThunkArg) => AppThunk => {
    const slice = useContext(ProductContext);
    const bundleProductId = useContext(BundleProductContext);

    return useMemo(() => {
        return ((arg?: ThunkArg) => {
            const meta: WithProductMeta = {
                meta: {
                    slice,
                    bundleProductId,
                    featureCase,
                    selector: getSelector(slice, bundleProductId)
                }
            };
            const argWithMeta: ThunkArg & WithProductMeta = Object.assign({}, arg, meta);
    
            return actionCreator(argWithMeta);
        })
    }, [actionCreator, slice, bundleProductId, featureCase]);
}
