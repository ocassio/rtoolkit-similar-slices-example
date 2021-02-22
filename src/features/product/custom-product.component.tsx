import React, { ChangeEventHandler, useContext, useEffect, useState } from "react";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductContext } from "./product.context";
import { useCustomProductActions, useCustomProductSelectors } from "./slices/custom-product.slice";
import { useProductSelectors } from "./slices/product.slices";

const CustomProduct: FC = () => {
    const sliceName = useContext(ProductContext);

    const { selectName } = useProductSelectors(sliceName);
    const {
        selectLoading,
        selectChars,
        selectVersion,
        chars: {
            selectVersion: selectCharsVersion
        }
    } = useCustomProductSelectors(sliceName);
    const name = useSelector(selectName);
    const chars = useSelector(selectChars);
    const loading = useSelector(selectLoading);

    const [newCharName, setNewCharName] = useState("");
    const handleNewCharNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setNewCharName(event.target.value);
    }

    const [newCharValue, setNewCharValue] = useState("");
    const handleNewCharValueChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setNewCharValue(event.target.value);
    }

    const dispatch = useDispatch();
    const {
        setChar,
        loadChars,
        nextVersion,
        chars: {
            nextVersion: nextCharsVersion
        }
    } = useCustomProductActions(sliceName);

    useEffect(() => {
        dispatch(loadChars());
    }, [dispatch, loadChars]);

    const handleSet = () => {
        dispatch(setChar({
            name: newCharName,
            value: newCharValue
        }));
    }

    const version = useSelector(selectVersion);
    const handleNextVersion = () => dispatch(nextVersion());

    const charsVersion = useSelector(selectCharsVersion);
    const handleNextCharsVersion = () => dispatch(nextCharsVersion());

    return (
        <div>
            <div>Name: {name}</div>
            <div>Version: {version}</div>
            <button type="button" onClick={handleNextVersion}>Next Version</button>
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
                    <div>
                        <div>Chars Version: {charsVersion}</div>
                        <button type="button" onClick={handleNextCharsVersion}>Next Chars Version</button>
                    </div>
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
