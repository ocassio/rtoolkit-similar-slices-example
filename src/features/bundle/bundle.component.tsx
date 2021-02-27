import React, { FC, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBundleName, selectBundleProductIds, addProduct } from "./slices/bundle.slice";
import Product from '../product/product.component';
import { ProductContext } from "../product/product.context";
import { ProductSliceNames } from "../product/slices/product.slices";
import { BundleProductContext } from "./bundle-product.context";

const Bundle: FC = () => {
    const name = useSelector(selectBundleName);
    const productIds = useSelector(selectBundleProductIds);
    
    const dispatch = useDispatch();
    const handleAddProduct = () => dispatch(addProduct());

    return (
        <div>
            <h2>Bundle: {name}</h2>
            <div>
                <ProductContext.Provider value={ProductSliceNames.BUNDLE}>
                    {productIds.map(id => (
                        <BundleProductContext.Provider key={id} value={id}>
                            <Product />
                        </BundleProductContext.Provider>
                    ))}
                </ProductContext.Provider>
            </div>
            <button type="button" onClick={handleAddProduct}>Add Product</button>
        </div>
    )
}

export default memo(Bundle);
