import React, { useContext } from "react";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductContext } from "./product.context";
import { increase, selectCount, selectName } from "./product.slice";

const Product: FC = () => {
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

export default React.memo(Product);
