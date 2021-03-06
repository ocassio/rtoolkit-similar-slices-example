import { createProductFeatureSlice } from "../../features/product-feature.slices";
import { servicesFeatureReducer } from "../../features/services/services.feature.slice";
import { genericProductSelector } from "../generic-product.selectors";

const servicesFeatureSlice = createProductFeatureSlice({
    caseName: "generic/services",
    initialState: {
        services: {
            ids: [],
            entities: {}
        }
    },
    reducer: servicesFeatureReducer,
    baseSelector: genericProductSelector(state => state.services, null)
});

export const {
    caseName: genericServicesCase,
    reducer: genericServicesReducer
} = servicesFeatureSlice;
