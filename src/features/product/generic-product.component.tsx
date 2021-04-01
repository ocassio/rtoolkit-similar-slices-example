import React, { FC } from "react";
import { selectName } from "./slices/abstract/abstract-product.slice";
import { createSelectDoubledVersionValue, nextVersion, selectVersionValue } from "./slices/features/version/version.feature.slice";
import { increase } from "./slices/generic/generic-product.slice";
import { useMemoizedProductSelector, useProductDispatch, useProductSelector, useProductThunk } from "./slices/product.hooks";
import ProductServices from "./services/product-services.component";
import { ProductFeatureContext } from "./product-feature.context";
import { selectCount, createSelectCountX2, selectEquipmentIds } from "./slices/generic/generic-product.selectors";
import { genericVersionCase } from "./slices/generic/features/generic-product-version.feature.slice";
import { loadProduct } from "./slices/generic/generic-product.thunks";
import { genericServicesCase } from "./slices/generic/features/generic-product-services.feature.slice";
import GenericEquipment from "./generic-equipment.component";

const versionFeatureProps = genericVersionCase();
const servicesFeatureProps = genericServicesCase();

const GenericProduct: FC = () => {

    const name = useProductSelector(selectName);
    const count = useProductSelector(selectCount);
    const countX2 = useMemoizedProductSelector(createSelectCountX2);
    const equipmentIds = useProductSelector(selectEquipmentIds);
    

    const dispatch = useProductDispatch();
    const bindedLoadProduct = useProductThunk(loadProduct);

    const handleIncrease = () => dispatch(increase(2));
    const handleLoad = () => dispatch(bindedLoadProduct());
    

    const version = useProductSelector(selectVersionValue, versionFeatureProps);
    const doubledVersion = useMemoizedProductSelector(createSelectDoubledVersionValue, versionFeatureProps);

    const versionDispatch = useProductDispatch(versionFeatureProps);
    const handleNextVersion = () => versionDispatch(nextVersion());

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
            <ProductFeatureContext.Provider value={servicesFeatureProps}>
                <ProductServices />
            </ProductFeatureContext.Provider>
            <h4>Equipment</h4>
            {equipmentIds.map(equipmentId => (
                <GenericEquipment key={equipmentId} id={equipmentId} />
            ))}
        </div>
    );
}

export default React.memo(GenericProduct);
