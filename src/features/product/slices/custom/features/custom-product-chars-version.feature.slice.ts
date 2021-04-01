import { createProductFeatureSlice } from "../../features/product-feature.slices";
import { versionFeatureReducer } from "../../features/version/version.feature.slice";
import { customProductSelector } from "../custom-product.selectors";

const versionFeatureSlice = createProductFeatureSlice({
    caseName: "custom/chars/version",
    reducer: versionFeatureReducer,
    baseSelector: customProductSelector(state => state.chars.version, undefined)
});

export const {
    propsCreator: customCharsVersionCase,
    reducer: customCharsVersionReducer
} = versionFeatureSlice;
