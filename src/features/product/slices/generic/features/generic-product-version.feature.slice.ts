import { createProductFeatureSlice } from "../../features/product-feature.slices";
import { versionFeatureReducer } from "../../features/version/version.feature.slice";
import { genericProductSelector } from "../generic-product.selectors";

const versionFeatureSlice = createProductFeatureSlice({
    caseName: "generic/version",
    initialState: {
        value: 0
    },
    reducer: versionFeatureReducer,
    baseSelector: genericProductSelector(state => state.version, null)
});

export const {
    caseName: genericVersionCase,
    reducer: genericVersionReducer
} = versionFeatureSlice;
