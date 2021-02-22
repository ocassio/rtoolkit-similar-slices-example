import React, { ChangeEventHandler, useEffect, useState } from "react";
import { FC } from "react";
import { selectName } from "./slices/abstract-product.slice";
import { loadChars, selectChars, selectLoading, setChar } from "./slices/custom-product.slice";
import { useProductDispatch, useProductSelector } from "./slices/product.hooks";

const CustomProduct: FC = () => {    
    const name = useProductSelector(selectName);
    const chars = useProductSelector(selectChars);
    const loading = useProductSelector(selectLoading);

    const [newCharName, setNewCharName] = useState("");
    const handleNewCharNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setNewCharName(event.target.value);
    }

    const [newCharValue, setNewCharValue] = useState("");
    const handleNewCharValueChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setNewCharValue(event.target.value);
    }

    const dispatch = useProductDispatch();

    useEffect(() => {
        dispatch(loadChars());
    }, [dispatch]);

    const handleSet = () => {
        dispatch(setChar({
            name: newCharName,
            value: newCharValue
        }));
    }

    // const version = useSelector(selectVersion);
    // const handleNextVersion = () => dispatch(nextVersion());

    // const charsVersion = useSelector(selectCharsVersion);
    // const handleNextCharsVersion = () => dispatch(nextCharsVersion());

    return (
        <div>
            <div>Name: {name}</div>
            {/* <div>Version: {version}</div>
            <button type="button" onClick={handleNextVersion}>Next Version</button> */}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <ul>
                        {Object.entries(chars).map(([char, value]) => (
                            <li key={char}>
                                {char} - {value}
                            </li>
                        ))}
                    </ul>
                    {/* <div>
                        <div>Chars Version: {charsVersion}</div>
                        <button type="button" onClick={handleNextCharsVersion}>Next Chars Version</button>
                    </div> */}
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
                </>
            )}
        </div>
    );
}

export default React.memo(CustomProduct);
