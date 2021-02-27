import React, { ChangeEventHandler, useEffect, useState } from "react";
import { FC } from "react";
import { selectName } from "./slices/abstract-product.slice";
import { loadChars, selectChars, selectCharsVersion, selectLoading, selectVersion, setChar } from "./slices/custom-product.slice";
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

    const versionDispatch = useProductDispatch("version");
    const version = useProductSelector(selectVersion);
    const bindedLoadVersion = useProductAsyncThunk(loadVersion, "version");
    const handleNextVersion = () => versionDispatch(nextVersion());
    const handleLoadVersion = () => versionDispatch(bindedLoadVersion());

    const charsVersionDispatch = useProductDispatch("charsVersion");
    const charsVersion = useProductSelector(selectCharsVersion);
    const bindedLoadCharsVersion = useProductAsyncThunk(loadVersion, "charsVersion");
    const handleNextCharsVersion = () => charsVersionDispatch(nextVersion());
    const handleLoadCharsVersion = () => versionDispatch(bindedLoadCharsVersion());

    return (
        <div>
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
