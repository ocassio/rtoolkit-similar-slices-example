import { createProductFeatureSlice } from "../../features/product-feature.slices";
import { servicesFeatureReducer } from "../../features/services/services.feature.slice";
import { customProductSelector } from "../custom-product.selectors";

const servicesFeatureSlice = createProductFeatureSlice({
    caseName: "custom/services",
    reducer: servicesFeatureReducer,
    baseSelector: customProductSelector(state => state.services, undefined)
});

export const {
    propsCreator: customServicesCase,
    reducer: customServicesReducer
} = servicesFeatureSlice;
