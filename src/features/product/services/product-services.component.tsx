import React, { FC, memo } from "react";
import { addService, loadServices, selectServiceIds } from "../slices/features/services/services.feature.slice";
import { useProductAsyncThunk, useProductDispatch, useProductSelector } from "../slices/product.hooks";
import ProductService from "./product-service.component";
import { v4 as uuid } from "uuid";

const ProductServices: FC = () => {
    const ids = useProductSelector(selectServiceIds);
    
    const dispatch = useProductDispatch();
    const handleAddService = () => {
        const id = uuid();
        dispatch(addService({
            id,
            name: `Service: ${id}`,
            count: 0
        }));
    };

    const bindedLoadServices = useProductAsyncThunk(loadServices);
    const handleLoad = () => dispatch(bindedLoadServices());

    return (
        <div>
            <h4>Services</h4>
            {ids.map(id => (
                <ProductService key={id} id={id} />
            ))}
            <button type="button" onClick={handleAddService}>Add Service</button>
            <button type="button" onClick={handleLoad}>Load Services</button>
        </div>
    )
}

export default memo(ProductServices);
