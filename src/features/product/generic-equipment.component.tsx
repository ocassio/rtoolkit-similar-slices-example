import { EntityId } from "@reduxjs/toolkit";
import React, { FC, memo, useMemo } from "react";
import { ProductFeatureContext } from "./product-feature.context";
import { genericEquipmentServicesCase } from "./slices/generic/features/generic-equipment-services.feature.slice";
import { selectEquipmentName } from "./slices/generic/generic-product.selectors";
import { useProductSelector } from "./slices/product.hooks";
import ProductServices from "./services/product-services.component";

interface GenericEquipmentProps {
    id: EntityId;
}

const GenericEquipment: FC<GenericEquipmentProps> = ({ id }) => {
    const name = useProductSelector(selectEquipmentName(id));
    
    const servicesFeatureProps = useMemo(() => genericEquipmentServicesCase(id), [id]);

    return (
        <div>
            <b>{name}</b>
            <ProductFeatureContext.Provider value={servicesFeatureProps}>
                <ProductServices />
            </ProductFeatureContext.Provider>
        </div>
    )
};

export default memo(GenericEquipment);
