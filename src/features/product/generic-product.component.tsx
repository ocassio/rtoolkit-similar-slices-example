import React, { useContext } from "react";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductContext } from "./product.context";
import { useProductActions, useProductSelectors } from "./slices/product.slices";

const GenericProduct: FC = () => {
    const sliceName = useContext(ProductContext);

    const { selectName, selectCount, selectCountX2 } = useProductSelectors(sliceName);
    const name = useSelector(selectName);
    const count = useSelector(selectCount);
    const countX2 = useSelector(selectCountX2);

    const dispatch = useDispatch();
    const { increase } = useProductActions(sliceName);

    const handleIncrease = () => dispatch(increase(2));

    return (
        <div>
            <div>Name: {name}</div>
            <div>Count: {count}</div>
            <div>Count x2: {countX2}</div>
            <div>
                <button type="button" onClick={handleIncrease}>Increase</button>
            </div>
        </div>
    );
}

export default React.memo(GenericProduct);
