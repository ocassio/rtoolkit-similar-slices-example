import React from 'react';
import GenericProduct from "./features/product/generic-product.component";
import CustomProduct from "./features/product/custom-product.component";
import { ProductContext } from './features/product/product.context';
import { ProductSliceName } from './features/product/slices/product.slices';

function App() {
  return (
    <div>
      <ProductContext.Provider value={ProductSliceName.PRODUCT}>
        <GenericProduct />
      </ProductContext.Provider>
      <ProductContext.Provider value={ProductSliceName.POPUP_PRODUCT}>
        <GenericProduct />
      </ProductContext.Provider>
      <ProductContext.Provider value={ProductSliceName.ONE_MORE_PRODUCT}>
        <CustomProduct />
      </ProductContext.Provider>
    </div>
  );
}

export default App;
