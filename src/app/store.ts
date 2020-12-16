import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { productReducer } from '../features/product/slices/product.slice';

export const store = configureStore({
  reducer: {
    product: productReducer("product"),
    popupProduct: productReducer("popupProduct"),
    oneMoreProduct: productReducer("oneMoreProduct")
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
