import React, { FC, memo } from "react";
import { selectType } from "./slices/abstract/abstract-product.slice";
import { GENERIC_PRODUCT_TYPE } from "./slices/generic/generic-product.slice";
import { useProductSelector } from "./slices/product.hooks";
import GenericProduct from "./generic-product.component";
import CustomProduct from "./custom-product.component";
import { CUSTOM_PRODUCT_TYPE } from "./slices/custom/custom-product.slice";

const Product: FC = () => {
    const type = useProductSelector(selectType);
    
    switch (type) {
        case GENERIC_PRODUCT_TYPE:
            return <GenericProduct />;
        case CUSTOM_PRODUCT_TYPE:
            return <CustomProduct />;
        default:
            return null;
    }
}

export default memo(Product);
