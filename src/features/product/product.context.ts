import React from "react";
import { ProductSliceName } from "./slices/product.slices";

export const ProductContext = React.createContext<ProductSliceName>("product");
