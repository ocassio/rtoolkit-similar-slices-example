import { createContext } from "react";
import { ProductFeatureProps } from "./slices/features/product-feature.slices";

export const ProductFeatureContext = createContext<ProductFeatureProps | undefined>(undefined);
