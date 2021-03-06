import { AnyAction, AsyncThunk, EntityId } from "@reduxjs/toolkit";
import { Dispatch, useCallback, useContext, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppThunk, RootSelector } from "../../../app/store";
import { BundleProductContext } from "../../bundle/bundle-product.context";
import { selectBundleProductById } from "../../bundle/slices/bundle.slice";
import { ProductFeatureContext } from "../product-feature.context";
import { ProductContext } from "../product.context";
import { productCaseSelectorsRegistry } from "./features/product-feature.slices";
import { ProductSliceNames } from "./product.slices";

const PRODUCT_SLICE_SELECTORS = {
    product: (state: RootState) => state.product,
    popupProduct: (state: RootState) => state.popupProduct,
    oneMoreProduct: (state: RootState) => state.oneMoreProduct,
    bundle: selectBundleProductById
}

function getSelector(
    sliceName: ProductSliceNames,
    bundleProductId?: EntityId,
    featureCase?: string
): RootSelector<any> {
    return state => {
        const productState = sliceName === ProductSliceNames.BUNDLE
            ? PRODUCT_SLICE_SELECTORS[ProductSliceNames.BUNDLE](state, bundleProductId!!)
            : PRODUCT_SLICE_SELECTORS[sliceName](state);
        if (!featureCase) {
            return productState;
        }

        const caseSelector = productCaseSelectorsRegistry[featureCase];
        if (!caseSelector) {
            throw new Error(`No product feature selector has been found for '${featureCase}'`);
        }

        return caseSelector(productState);
    }
}

function useFeatureCase(featureCase?: string): string | undefined {
    const contextValue = useContext(ProductFeatureContext);
    return featureCase ?? contextValue;
}

export const useProductDispatch = (featureCase?: string): Dispatch<any> => {
    const dispatch = useDispatch();
    const slice = useContext(ProductContext);
    const bundleProductId = useContext(BundleProductContext);
    const actualCase = useFeatureCase(featureCase);
    
    return useCallback((action: AnyAction) => {
        const meta: ProductMeta = {
            slice,
            bundleProductId,
            featureCase: actualCase
        }
        action.meta = Object.assign(action.meta || {}, meta);
        dispatch(action);
    }, [dispatch, slice, bundleProductId, actualCase]);
}

export const useProductSelector = <T> (selector: (state: any) => T, featureCase?: string): T => {
    const sliceName = useContext(ProductContext);
    const productId = useContext(BundleProductContext);
    const actualCase = useFeatureCase(featureCase);

    return useSelector((state: RootState) => {
        const baseSelector = getSelector(sliceName, productId, actualCase);
        const baseState = baseSelector(state);

        return selector(baseState);
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

export const useProductAsyncThunk = <Returned, ThunkArg, ThunkApiConfig> (
    thunk: AsyncThunk<Returned, ThunkArg, ThunkApiConfig>,
    featureCase?: string
): AsyncThunk<Returned, ThunkArg, ThunkApiConfig> => {
    const slice = useContext(ProductContext);
    const bundleProductId = useContext(BundleProductContext);
    const actualCase = useFeatureCase(featureCase);

    return useMemo(() => {
        const actionCreator = ((arg: ThunkArg) => {
            const meta: WithProductMeta = {
                meta: {
                    slice,
                    bundleProductId,
                    featureCase: actualCase,
                    selector: getSelector(slice, bundleProductId, actualCase)
                }
            };
            const argWithMeta: ThunkArg & WithProductMeta = Object.assign({}, arg, meta);
    
            return thunk(argWithMeta);
        }) as AsyncThunk<Returned, ThunkArg, ThunkApiConfig>;
    
        Object.assign(actionCreator, thunk);
    
        return actionCreator;
    }, [thunk, slice, bundleProductId, actualCase]);
}

export const useProductThunk = <ThunkArg> (
    actionCreator: (arg?: ThunkArg) => AppThunk,
    featureCase?: string
): (arg?: ThunkArg) => AppThunk => {
    const slice = useContext(ProductContext);
    const bundleProductId = useContext(BundleProductContext);
    const actualCase = useFeatureCase(featureCase);

    return useMemo(() => {
        return ((arg?: ThunkArg) => {
            const meta: WithProductMeta = {
                meta: {
                    slice,
                    bundleProductId,
                    featureCase: actualCase,
                    selector: getSelector(slice, bundleProductId, actualCase)
                }
            };
            const argWithMeta: ThunkArg & WithProductMeta = Object.assign({}, arg, meta);
    
            return actionCreator(argWithMeta);
        })
    }, [actionCreator, slice, bundleProductId, actualCase]);
}
