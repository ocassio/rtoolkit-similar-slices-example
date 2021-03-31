import { createEntityAdapter, createSelector, EntityId } from "@reduxjs/toolkit";
import { StandaloneProductState } from "../abstract/abstract-product.slice";
import { Equipment, GenericProductState, GENERIC_PRODUCT_TYPE } from "./generic-product.slice";

export const genericProductSelector = <T> (selector: (state: GenericProductState) => T, fallbackValue: T): (state: StandaloneProductState) => T => {
    return (state: StandaloneProductState) => {
        const s = state?.type === GENERIC_PRODUCT_TYPE ? state : null;
        return s ? selector(s) : fallbackValue;
    };
}

export const selectCount = genericProductSelector(state => state.count, 0);

export const createSelectCountX2 = () => createSelector(
    selectCount,
    count => count * 2
);

const equipmentAdapter = createEntityAdapter<Equipment>();

export const {
    selectIds: selectEquipmentIds,
    selectById: selectEquipmentById
} = equipmentAdapter.getSelectors(
    genericProductSelector(state => state.equipment, null!!)
);

export const selectEquipmentName = (id: EntityId) =>
    (state: StandaloneProductState) => selectEquipmentById(state, id)?.name;
