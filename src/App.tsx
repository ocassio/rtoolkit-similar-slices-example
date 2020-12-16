import React from 'react';
import GenericProduct from "./features/product/generic-product.component";
import CustomProduct from "./features/product/custom-product.component";
import { ProductContext } from './features/product/product.context';

function App() {
  return (
    <div>
      <ProductContext.Provider value="product">
        <GenericProduct />
      </ProductContext.Provider>
      <ProductContext.Provider value="popupProduct">
        <GenericProduct />
      </ProductContext.Provider>
      <ProductContext.Provider value="oneMoreProduct">
        <CustomProduct />
      </ProductContext.Provider>
    </div>
  );
}

export default App;
