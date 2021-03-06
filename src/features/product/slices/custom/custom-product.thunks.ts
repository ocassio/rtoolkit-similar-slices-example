import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../../app/store";
import { WithProductMeta } from "../product.hooks";
import { CustomProductState } from "./custom-product.slice";

// Product async thunks have one restriction:
// If they are accepting an argument, it should be an object without meta field,
// so the meta data could be attached without hurting the original value.
// Example:
// Instead of `(id: string) => SomeProduct` you should use `({ id: string }) => SomeProduct`.
export const loadChars = createAsyncThunk(
    "product/custom/loadChars",
    (arg: WithProductMeta<{}, CustomProductState> | undefined, thunkApi) => new Promise<Record<string, string>>(resolve => {
        
        // --- Accessing state from thunk example
        const selector = arg?.meta?.selector;
        const state = thunkApi.getState() as RootState;
        const product = selector && selector(state);

        console.log(product);
        // -------
        
        setTimeout(
            () => resolve({
                "Server Char 1": "Value 1",
                "Server Char 2": "Value 2"
            }),
            2000
        )
    })
);
