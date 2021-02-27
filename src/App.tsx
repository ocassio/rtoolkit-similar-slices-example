import React from 'react';
import GenericProduct from "./features/product/generic-product.component";
import CustomProduct from "./features/product/custom-product.component";
import { ProductContext } from './features/product/product.context';
import { ProductSliceNames } from './features/product/slices/product.slices';
import Bundle from './features/bundle/bundle.component';

function App() {
  return (
    <div>
      <h1>Products</h1>
      <h2>Product</h2>
      <ProductContext.Provider value={ProductSliceNames.PRODUCT}>
        <GenericProduct />
      </ProductContext.Provider>
      <h2>Popup Product</h2>
      <ProductContext.Provider value={ProductSliceNames.POPUP_PRODUCT}>
        <GenericProduct />
      </ProductContext.Provider>
      <h2>One More Product</h2>
      <ProductContext.Provider value={ProductSliceNames.ONE_MORE_PRODUCT}>
        <CustomProduct />
      </ProductContext.Provider>

      <h1>Bundle</h1>
      <Bundle />
    </div>
  );
}

export default App;
