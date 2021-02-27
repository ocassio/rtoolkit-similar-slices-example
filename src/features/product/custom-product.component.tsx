import React, { ChangeEventHandler, useEffect, useState } from "react";
import { FC } from "react";
import { selectName } from "./slices/abstract-product.slice";
import { CHARS_VERSION_CASE, loadChars, selectChars, selectCharsVersion, selectLoading, selectVersion, setChar, VERSION_CASE } from "./slices/custom-product.slice";
import { loadVersion, nextVersion } from "./slices/features/version.feature.slice";
import { useProductDispatch, useProductSelector, useProductAsyncThunk } from "./slices/product.hooks";

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
    const bindedLoadChars = useProductAsyncThunk(loadChars);

    useEffect(() => {
        dispatch(bindedLoadChars());
    }, [dispatch, bindedLoadChars]);

    const handleSet = () => {
        dispatch(setChar({
            name: newCharName,
            value: newCharValue
        }));
    }


    const versionDispatch = useProductDispatch(VERSION_CASE);
    const version = useProductSelector(selectVersion);
    const bindedLoadVersion = useProductAsyncThunk(loadVersion, VERSION_CASE);

    const handleNextVersion = () => versionDispatch(nextVersion());
    const handleLoadVersion = () => versionDispatch(bindedLoadVersion());


    const charsVersionDispatch = useProductDispatch(CHARS_VERSION_CASE);
    const charsVersion = useProductSelector(selectCharsVersion);
    const bindedLoadCharsVersion = useProductAsyncThunk(loadVersion, CHARS_VERSION_CASE);

    const handleNextCharsVersion = () => charsVersionDispatch(nextVersion());
    const handleLoadCharsVersion = () => versionDispatch(bindedLoadCharsVersion());

    return (
        <div>
            <h3>Custom Product</h3>
            <div>Name: {name}</div>
            <div>Version: {version}</div>
            <button type="button" onClick={handleNextVersion}>Next Version</button>
            <button type="button" onClick={handleLoadVersion}>Load Vesion</button>
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
                        <button type="button" onClick={handleLoadCharsVersion}>Load Chars Version</button>
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
