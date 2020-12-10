import React from "react";
import { ProductSliceName } from "./product.slice";

export const ProductContext = React.createContext<ProductSliceName>("product");
