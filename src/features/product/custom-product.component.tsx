import React, { ChangeEventHandler, useEffect, useState } from "react";
import { FC } from "react";
import { ProductFeatureContext } from "./product-feature.context";
import { selectName } from "./slices/abstract-product.slice";
import { CUSTOM_CHARS_VERSION_CASE, loadChars, selectChars, selectLoading, setChar, CUSTOM_VERSION_CASE, CUSTOM_SERVICES_CASE } from "./slices/custom-product.slice";
import { loadVersion, nextVersion, selectVersionValue } from "./slices/features/version/version.feature.slice";
import { useProductDispatch, useProductSelector, useProductAsyncThunk } from "./slices/product.hooks";
import ProductServices from "./services/product-services.component";

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


    const versionDispatch = useProductDispatch(CUSTOM_VERSION_CASE);
    const version = useProductSelector(selectVersionValue, CUSTOM_VERSION_CASE);
    const bindedLoadVersion = useProductAsyncThunk(loadVersion, CUSTOM_VERSION_CASE);

    const handleNextVersion = () => versionDispatch(nextVersion());
    const handleLoadVersion = () => versionDispatch(bindedLoadVersion());


    const charsVersionDispatch = useProductDispatch(CUSTOM_CHARS_VERSION_CASE);
    const charsVersion = useProductSelector(selectVersionValue, CUSTOM_CHARS_VERSION_CASE);
    const bindedLoadCharsVersion = useProductAsyncThunk(loadVersion, CUSTOM_CHARS_VERSION_CASE);

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
            <ProductFeatureContext.Provider value={CUSTOM_SERVICES_CASE}>
                <ProductServices />
            </ProductFeatureContext.Provider>
        </div>
    );
}

export default React.memo(CustomProduct);
