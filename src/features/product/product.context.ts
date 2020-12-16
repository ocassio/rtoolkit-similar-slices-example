import React from "react";
import { ProductSliceName } from "./slices/product.slice";

export const ProductContext = React.createContext<ProductSliceName>("product");
