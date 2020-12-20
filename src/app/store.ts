import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { productReducer, ProductSliceName } from '../features/product/slices/product.slices';

export const store = configureStore({
  reducer: {
    product: productReducer(ProductSliceName.PRODUCT),
    popupProduct: productReducer(ProductSliceName.POPUP_PRODUCT),
    oneMoreProduct: productReducer(ProductSliceName.ONE_MORE_PRODUCT)
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
