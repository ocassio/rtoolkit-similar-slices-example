import React from 'react';
import Product from './features/product/product.component';
import { ProductContext } from './features/product/product.context';

function App() {
  return (
    <div>
      <ProductContext.Provider value="product">
        <Product />
      </ProductContext.Provider>
      <ProductContext.Provider value="popupProduct">
        <Product />
      </ProductContext.Provider>
    </div>
  );
}

export default App;
