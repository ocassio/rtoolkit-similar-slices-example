import React from "react";
import { FC } from "react";
import { selectName } from "./slices/abstract-product.slice";
import { increase, loadProduct, selectCount, selectCountX2 } from "./slices/generic-product.slice";
import { useProductDispatch, useProductSelector } from "./slices/product.hooks";

const GenericProduct: FC = () => {

    const name = useProductSelector(selectName);
    const count = useProductSelector(selectCount);
    const countX2 = useProductSelector(selectCountX2);
    // const version = useSelector(selectVersion);

    const dispatch = useProductDispatch();

    const handleIncrease = () => dispatch(increase(2));
    const handleLoad = () => dispatch(loadProduct());
    // const handleNextVersion = () => dispatch(nextVersion());

    return (
        <div>
            <div>Name: {name}</div>
            <div>Count: {count}</div>
            <div>Count x2: {countX2}</div>
            {/* <div>Version: {version}</div> */}
            <div>
                <button type="button" onClick={handleIncrease}>Increase</button>
                <button type="button" onClick={handleLoad}>Load</button>
                {/* <button type="button" onClick={handleNextVersion}>Next Version</button> */}
            </div>
        </div>
    );
}

export default React.memo(GenericProduct);
