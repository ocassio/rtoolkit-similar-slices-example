import { AnyAction, Reducer } from "@reduxjs/toolkit";

export const productCaseSelectorsRegistry: Record<string, (state: any, arg?: any) => any> = {};

export interface ProductFeatureSliceParams<ParentState, State, Arg = void> {
    caseName: string;
    reducer: Reducer<State, AnyAction>;
    baseSelector: (state: ParentState, arg: Arg) => State | undefined;
}

export interface ProductFeatureProps {
    case: string;
    arg?: any;
}

export interface ProductFeatureSlice<State, Arg> {
    caseName: string;
    propsCreator: (arg: Arg) => ProductFeatureProps;
    reducer: (state: State, action: AnyAction) => State | undefined;
}

export const createProductFeatureSlice = <ParentState, State, Arg = void> ({
    caseName,
    reducer,
    baseSelector
}: ProductFeatureSliceParams<ParentState, State, Arg>): ProductFeatureSlice<ParentState, Arg> => {
    if (caseName in productCaseSelectorsRegistry) {
        throw new Error(`Feature slice for '${caseName}' is already present in the registry`);
    }

    productCaseSelectorsRegistry[caseName] = baseSelector;

    return {
        caseName,
        propsCreator: (arg) => ({
            case: caseName,
            arg
        }),
        reducer(state = null!!, action) {
            const meta = action.meta || action.meta?.arg?.meta;
            if (meta?.feature?.case !== caseName) {
                return state;
            }
            
            const baseState = baseSelector(state, meta?.feature?.arg);
            reducer(baseState, action);
        }
    }
}
