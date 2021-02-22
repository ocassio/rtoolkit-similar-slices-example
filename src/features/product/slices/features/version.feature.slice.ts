import { createAction, createReducer } from "@reduxjs/toolkit"
import { RootSelector } from "../../../../app/store"

export interface VersionedState {
    version: number;
}

const defaultInitialState: VersionedState = {
    version: 0
}

export interface FeatureSliceParams<T> {
    prefix: string;
    initialState?: T;
    baseSelector: RootSelector<T | null | undefined>;
}

type VersionSliceParams = FeatureSliceParams<VersionedState>;

export function createVersionFeatureSlice({ prefix, initialState = defaultInitialState, baseSelector }: VersionSliceParams) {
    const nextVersion = createAction(prefix + '/nextVersion');

    const selectVersion: RootSelector<number> = state => baseSelector(state)?.version ?? 0;

    const reducer = createReducer(initialState, builder => {
        builder.addCase(nextVersion, state => {
            state.version++;
        });
    });

    return {
        reducer,
        actions: {
            nextVersion
        },
        selectors: {
            selectVersion
        }
    };
}
