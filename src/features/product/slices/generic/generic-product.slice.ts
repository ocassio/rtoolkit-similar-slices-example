import { createSlice, EntityId, EntityState, PayloadAction } from "@reduxjs/toolkit";
import { AbstractProductState } from "../abstract/abstract-product.slice";
import { ServicesState } from "../features/services/services.feature.slice";
import { VersionState } from "../features/version/version.feature.slice";
import { genericEquipmentServicesReducer } from "./features/generic-equipment-services.feature.slice";
import { genericServicesReducer } from "./features/generic-product-services.feature.slice";
import { genericVersionReducer } from "./features/generic-product-version.feature.slice";

export const GENERIC_PRODUCT_TYPE = "generic";

export interface GenericProductState extends AbstractProductState {
    type: typeof GENERIC_PRODUCT_TYPE;
    count: number;
    version: VersionState;
    services: ServicesState;
    equipment: EntityState<Equipment>;
}

export interface Equipment {
    id: EntityId;
    name: string;
    services: ServicesState;
}

const initialState: GenericProductState = null!!;

const slice = createSlice({
    name: "product/generic",
    initialState,
    reducers: {
        increase(state, action: PayloadAction<number>) {
            state.count += action.payload;
        }
    },
    extraReducers(builder) {
        builder.addDefaultCase((state, action) => {
            genericVersionReducer(state, action);
            genericServicesReducer(state, action);
            genericEquipmentServicesReducer(state, action);
        });
    }
});

export const { increase } = slice.actions;

export const genericProductReducer = slice.reducer;
