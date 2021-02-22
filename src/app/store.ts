import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { bunldeReducer } from '../features/bundle/slices/bundle.slice';
import { productReducer, ProductSliceNames } from '../features/product/slices/product.slices';

export const store = configureStore({
  reducer: {
    product: productReducer(ProductSliceNames.PRODUCT),
    popupProduct: productReducer(ProductSliceNames.POPUP_PRODUCT),
    oneMoreProduct: productReducer(ProductSliceNames.ONE_MORE_PRODUCT),
    bundle: bunldeReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootSelector<T> = (state: RootState) => T;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
