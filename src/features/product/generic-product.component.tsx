import React from "react";
import { FC } from "react";
import { selectName } from "./slices/abstract-product.slice";
import { nextVersion, selectDoubledVersionValue, selectVersionValue } from "./slices/features/version/version.feature.slice";
import { GENERIC_SERVICES_CASE, GENERIC_VERSION_CASE, increase, loadProduct, selectCount, selectCountX2 } from "./slices/generic-product.slice";
import { useProductDispatch, useProductSelector, useProductThunk } from "./slices/product.hooks";
import ProductServices from "./services/product-services.component";
import { ProductFeatureContext } from "./product-feature.context";

const GenericProduct: FC = () => {

    const name = useProductSelector(selectName);
    const count = useProductSelector(selectCount);
    const countX2 = useProductSelector(selectCountX2);
    const version = useProductSelector(selectVersionValue, GENERIC_VERSION_CASE);
    const doubledVersion = useProductSelector(selectDoubledVersionValue, GENERIC_VERSION_CASE);

    const dispatch = useProductDispatch();
    const bindedLoadProduct = useProductThunk(loadProduct);

    const handleIncrease = () => dispatch(increase(2));
    const handleLoad = () => dispatch(bindedLoadProduct());
    const handleNextVersion = () => dispatch(nextVersion());

    return (
        <div>
            <h3>Generic Product</h3>
            <div>Name: {name}</div>
            <div>Count: {count}</div>
            <div>Count x2: {countX2}</div>
            <div>Version: {version}</div>
            <div>Version x2: {doubledVersion}</div>
            <div>
                <button type="button" onClick={handleIncrease}>Increase</button>
                <button type="button" onClick={handleLoad}>Load</button>
                <button type="button" onClick={handleNextVersion}>Next Version</button>
            </div>
            <ProductFeatureContext.Provider value={GENERIC_SERVICES_CASE}>
                <ProductServices />
            </ProductFeatureContext.Provider>
        </div>
    );
}

export default React.memo(GenericProduct);
