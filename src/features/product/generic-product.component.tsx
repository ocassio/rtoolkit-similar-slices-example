import React, { useContext } from "react";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductContext } from "./product.context";
import { selectName } from "./slices/abstract-product.slice";
import { increase, selectCount } from "./slices/generic-product.slice";

const GenericProduct: FC = () => {
    const sliceName = useContext(ProductContext);

    const name = useSelector(selectName(sliceName));
    const count = useSelector(selectCount(sliceName));

    const dispatch = useDispatch();
    const handleIncrease = () => {
        dispatch(increase(sliceName)(2))
    }

    return (
        <div>
            <div>Name: {name}</div>
            <div>Count: {count}</div>
            <div>
                <button type="button" onClick={handleIncrease}>Increase</button>
            </div>
        </div>
    );
}

export default React.memo(GenericProduct);
