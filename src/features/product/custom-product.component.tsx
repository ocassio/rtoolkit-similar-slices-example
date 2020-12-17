import React, { ChangeEventHandler, useContext, useState } from "react";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductContext } from "./product.context";
import { selectName } from "./slices/abstract-product.slice";
import { selectChars, setChar } from "./slices/custom-product.slice";

const CustomProduct: FC = () => {
    const sliceName = useContext(ProductContext);

    const name = useSelector(selectName(sliceName));
    const chars = useSelector(selectChars(sliceName));

    const [newCharName, setNewCharName] = useState("");
    const handleNewCharNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setNewCharName(event.target.value);
    }

    const [newCharValue, setNewCharValue] = useState("");
    const handleNewCharValueChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setNewCharValue(event.target.value);
    }

    const dispatch = useDispatch();
    const handleSet = () => {
        dispatch(setChar(sliceName)({
            name: newCharName,
            value: newCharValue
        }));
    }

    return (
        <div>
            <div>Name: {name}</div>
            <ul>
                {Object.entries(chars).map(([char, value]) => (
                    <li key={char}>
                        {char} - {value}
                    </li>
                ))}
            </ul>
            <div>
                <label>
                    Char:
                    <input
                        type="text"
                        value={newCharName}
                        onChange={handleNewCharNameChange}
                    />
                </label>
                <label>
                    Value:
                    <input
                        type="text"
                        value={newCharValue}
                        onChange={handleNewCharValueChange}
                    />
                </label>
                <button type="button" onClick={handleSet}>Set</button>
            </div>
        </div>
    );
}

export default React.memo(CustomProduct);
