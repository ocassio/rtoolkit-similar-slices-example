import React from "react";
import { ProductSliceNames } from "./slices/product.slices";

export const ProductContext = React.createContext<ProductSliceNames>(ProductSliceNames.PRODUCT);
