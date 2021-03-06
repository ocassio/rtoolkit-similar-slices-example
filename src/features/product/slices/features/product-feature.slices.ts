import { AnyAction, Reducer } from "@reduxjs/toolkit";

export const productCaseSelectorsRegistry: Record<string, (state: any) => any> = {};

export interface ProductFeatureSliceParams<State> {
    caseName: string;
    initialState: State;
    reducer: Reducer<State, AnyAction>;
    baseSelector: (state: any) => State | undefined | null;
}

export interface ProductFeatureSlice<State> {
    caseName: string;
    reducer: Reducer<State, AnyAction>;
}

export const createProductFeatureSlice = <State> ({
    caseName,
    initialState,
    reducer,
    baseSelector
}: ProductFeatureSliceParams<State>): ProductFeatureSlice<State> => {
    if (caseName in productCaseSelectorsRegistry) {
        throw new Error(`Feature slice for '${caseName}' is already present in the registry`);
    }

    productCaseSelectorsRegistry[caseName] = baseSelector;

    return {
        caseName,
        reducer(state = initialState, action) {
            if (action.meta?.featureCase === caseName || action.meta?.arg?.meta?.featureCase === caseName) {
                return reducer(state, action);
            }
            return state;
        }
    }
}
