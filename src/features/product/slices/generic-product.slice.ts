import { AnyAction, createAction } from "@reduxjs/toolkit";
import { AbstractProductState, productSlice, ProductSliceName, ProductState } from "./product.slice";
import { produce } from "immer";
import { RootState } from "../../../app/store";

export interface GenericProductState extends AbstractProductState {
    type: "generic";
    count: number;
}

export const createGenericProductSlice = (prefix: string) => {
    const increase = createAction<number>(prefix + "increase");
    const reducer = (state: GenericProductState, action: AnyAction): ProductState => {
        if (increase.match(action)) {
            return produce(state, draft => {
                draft.count++;
            });
        }

        return state;
    }

    return {
        reducer,
        actions: {
            increase
        }
    };
}

export const increase = (name: ProductSliceName) => productSlice(name).actions.increase;

export const selectCount = (name: ProductSliceName) => (state: RootState) => {
    const s = state[name];
    return s?.type === "generic" ? s.count : 0;
}
