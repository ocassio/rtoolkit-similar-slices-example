import React, { useContext } from "react";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductContext } from "./product.context";
import { useGenericProductActions, useGenericProductSelectors } from "./slices/generic-product.slice";
import { useProductSelectors } from "./slices/product.slices";

const GenericProduct: FC = () => {
    const sliceName = useContext(ProductContext);

    const { selectName } = useProductSelectors(sliceName);
    const { selectCount, selectCountX2, selectVersion } = useGenericProductSelectors(sliceName);
    const name = useSelector(selectName);
    const count = useSelector(selectCount);
    const countX2 = useSelector(selectCountX2);
    const version = useSelector(selectVersion);

    const dispatch = useDispatch();
    const { increase, loadProduct, nextVersion } = useGenericProductActions(sliceName);

    const handleIncrease = () => dispatch(increase(2));
    const handleLoad = () => dispatch(loadProduct());
    const handleNextVersion = () => dispatch(nextVersion());

    return (
        <div>
            <div>Name: {name}</div>
            <div>Count: {count}</div>
            <div>Count x2: {countX2}</div>
            <div>Version: {version}</div>
            <div>
                <button type="button" onClick={handleIncrease}>Increase</button>
                <button type="button" onClick={handleLoad}>Load</button>
                <button type="button" onClick={handleNextVersion}>Next Version</button>
            </div>
        </div>
    );
}

export default React.memo(GenericProduct);
