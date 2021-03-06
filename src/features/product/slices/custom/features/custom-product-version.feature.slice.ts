import { createProductFeatureSlice } from "../../features/product-feature.slices";
import { versionFeatureReducer } from "../../features/version/version.feature.slice";
import { customProductSelector } from "../custom-product.selectors";

const versionFeatureSlice = createProductFeatureSlice({
    caseName: "custom/version",
    initialState: {
        value: 0
    },
    reducer: versionFeatureReducer,
    baseSelector: customProductSelector(state => state.version, null)
});

export const {
    caseName: customVersionCase,
    reducer: customVersionReducer
} = versionFeatureSlice;
