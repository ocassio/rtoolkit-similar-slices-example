import { EntityId } from "@reduxjs/toolkit";
import React, { FC, memo } from "react";
import { increaseCount, selectServiceById } from "../slices/features/services/services.feature.slice";
import { useProductDispatch, useProductSelector } from "../slices/product.hooks";

interface ProductServiceProps {
    id: EntityId;
}

const ProductService: FC<ProductServiceProps> = ({ id }) => {
    const service = useProductSelector(selectServiceById(id));

    const dispatch = useProductDispatch();
    const handleIncrease = () => dispatch(increaseCount({
        id,
        amount: 7
    }));
    
    if (!service) {
        return null;
    }

    return (
        <div>
            <h5>{service.name}</h5>
            <span>Count: {service.count}</span>
            <button type="button" onClick={handleIncrease}>Increase</button>
        </div>
    );
}

export default memo(ProductService);
