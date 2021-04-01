import { createProductFeatureSlice } from "../../features/product-feature.slices";
import { servicesFeatureReducer } from "../../features/services/services.feature.slice";
import { genericProductSelector } from "../generic-product.selectors";

const servicesFeatureSlice = createProductFeatureSlice({
    caseName: "generic/services",
    reducer: servicesFeatureReducer,
    baseSelector: genericProductSelector(state => state.services, undefined)
});

export const {
    propsCreator: genericServicesCase,
    reducer: genericServicesReducer
} = servicesFeatureSlice;
