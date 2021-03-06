import { createEntityAdapter, createSlice, EntityId, EntityState, PayloadAction } from "@reduxjs/toolkit";

export interface Service {
    id: EntityId;
    name: string;
    count: number;
}

export interface ServicesState {
    services: EntityState<Service>;
}

const servicesAdapter = createEntityAdapter<Service>();

const initialState: ServicesState = {
    services: servicesAdapter.getInitialState()
}

const slice = createSlice({
    name: "product/feature/services",
    initialState,
    reducers: {
        addService(state, action: PayloadAction<Service>) {
            servicesAdapter.addOne(state.services, action.payload);
        },
        increaseCount(state, action: PayloadAction<{ id: EntityId, amount: number }>) {
            const { id, amount } = action.payload;
            const service = state.services.entities[id];
            if (service) {
                service.count += amount;
            }
        }
    }
});

export const { addService, increaseCount } = slice.actions;

export const servicesFeatureReducer = slice.reducer;

const { selectIds, selectById } = servicesAdapter.getSelectors((state: ServicesState) => state.services);

export const selectServiceIds = selectIds;
export const selectServiceById = (id: EntityId) => (state: ServicesState) => selectById(state, id);
