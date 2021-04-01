import { createProductFeatureSlice } from "../../features/product-feature.slices";
import { versionFeatureReducer } from "../../features/version/version.feature.slice";
import { genericProductSelector } from "../generic-product.selectors";

const versionFeatureSlice = createProductFeatureSlice({
    caseName: "generic/version",
    reducer: versionFeatureReducer,
    baseSelector: genericProductSelector(state => state.version, undefined)
});

export const {
    propsCreator: genericVersionCase,
    reducer: genericVersionReducer
} = versionFeatureSlice;
