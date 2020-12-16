import { AnyAction, createAction } from "@reduxjs/toolkit";
import { AbstractProductState, productSlice, ProductSliceName, ProductState } from "./product.slice";
import { produce } from "immer";
import { RootState } from "../../../app/store";

export interface CustomProductState extends AbstractProductState {
    type: "custom";
    chars: Record<string, string>;
}

export const createCustomProductSlice = (prefix: string) => {
    const setChar = createAction<{ name: string, value: string }>(prefix + "setChar");

    const reducer = (state: CustomProductState, action: AnyAction): ProductState => {
        if (setChar.match(action)) {
            return produce(state, draft => {
                const { name, value } = action.payload;
                draft.chars[name] = value;
            });
        }
        
        return state;
    }

    return {
        reducer,
        actions: {
            setChar
        }
    };
} 

export const setChar = (name: ProductSliceName) => productSlice(name).actions.setChar;

export const selectChars = (name: ProductSliceName) => (state: RootState) => {
    const s = state[name];
    return s?.type === "custom" ? s.chars : {};
}
