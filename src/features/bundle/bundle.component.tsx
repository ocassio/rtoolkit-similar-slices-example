import React, { FC, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBundleName, selectBundleProductIds, addProduct } from "./slices/bundle.slice";
import BundleProduct from './bundle-product.component';

const Bundle: FC = () => {
    const name = useSelector(selectBundleName);
    const productIds = useSelector(selectBundleProductIds);
    
    const dispatch = useDispatch();
    const handleAddProduct = () => dispatch(addProduct());

    return (
        <div>
            <h2>Bundle: {name}</h2>
            <div>
                {productIds.map(id => (
                    <BundleProduct key={id} id={id} />
                ))}
            </div>
            <button type="button" onClick={handleAddProduct}>Add Product</button>
        </div>
    )
}

export default memo(Bundle);
