import { createContext } from "react";

export interface ProductFeatureProps {
    case: string;
    arg?: any;
}

export const ProductFeatureContext = createContext<ProductFeatureProps | undefined>(undefined);
