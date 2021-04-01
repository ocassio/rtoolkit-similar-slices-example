import { createProductFeatureSlice } from "../../features/product-feature.slices";
import { versionFeatureReducer } from "../../features/version/version.feature.slice";
import { customProductSelector } from "../custom-product.selectors";

const versionFeatureSlice = createProductFeatureSlice({
    caseName: "custom/version",
    reducer: versionFeatureReducer,
    baseSelector: customProductSelector(state => state.version, undefined)
});

export const {
    propsCreator: customVersionCase,
    reducer: customVersionReducer
} = versionFeatureSlice;
