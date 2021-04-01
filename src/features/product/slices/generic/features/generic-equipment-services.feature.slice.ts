import { EntityId } from "@reduxjs/toolkit";
import { ProductState } from "../../abstract/abstract-product.slice";
import { createProductFeatureSlice } from "../../features/product-feature.slices";
import { servicesFeatureReducer } from "../../features/services/services.feature.slice";
import { genericProductSelector } from "../generic-product.selectors";

const genericEquipmentServicesFeatureSlice = createProductFeatureSlice({
    caseName: "generic/equipment/services",
    reducer: servicesFeatureReducer,
    baseSelector: (state: ProductState, equipmentId: EntityId) =>
        genericProductSelector(s => s.equipment.entities[equipmentId]?.services, undefined)(state)
});

export const {
    propsCreator: genericEquipmentServicesCase,
    reducer: genericEquipmentServicesReducer
} = genericEquipmentServicesFeatureSlice;
