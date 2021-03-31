import { createSelector } from "@reduxjs/toolkit";
import { VersionState } from "./version.feature.slice";

export const selectVersionValue = (state: VersionState) => state.value;
export const selectDoubledVersionValue = createSelector(
    [selectVersionValue],
    (value) => value * 2
);
