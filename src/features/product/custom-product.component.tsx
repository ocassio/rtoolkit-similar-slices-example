import React, { ChangeEventHandler, useEffect, useState } from "react";
import { FC } from "react";
import { ProductFeatureContext } from "./product-feature.context";
import { selectName } from "./slices/abstract/abstract-product.slice";
import { loadVersion, nextVersion, selectVersionValue } from "./slices/features/version/version.feature.slice";
import { useProductDispatch, useProductSelector, useProductAsyncThunk } from "./slices/product.hooks";
import ProductServices from "./services/product-services.component";
import { selectChars, selectLoading } from "./slices/custom/custom-product.selectors";
import { setChar } from "./slices/custom/custom-product.slice";
import { loadChars } from "./slices/custom/custom-product.thunks";
import { customVersionCase } from "./slices/custom/features/custom-product-version.feature.slice";
import { customCharsVersionCase } from "./slices/custom/features/custom-product-chars-version.feature.slice";
import { customServicesCase } from "./slices/custom/features/custom-product-services.feature.slice";

const versionFeatureProps = customVersionCase();
const charsVersionFeatureProps = customCharsVersionCase();
const servicesFeatureProps = customServicesCase();

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


    const versionDispatch = useProductDispatch(versionFeatureProps);
    const version = useProductSelector(selectVersionValue, versionFeatureProps);
    const bindedLoadVersion = useProductAsyncThunk(loadVersion, versionFeatureProps);

    const handleNextVersion = () => versionDispatch(nextVersion());
    const handleLoadVersion = () => versionDispatch(bindedLoadVersion());


    const charsVersionDispatch = useProductDispatch(charsVersionFeatureProps);
    const charsVersion = useProductSelector(selectVersionValue, charsVersionFeatureProps);
    const bindedLoadCharsVersion = useProductAsyncThunk(loadVersion, charsVersionFeatureProps);

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
            <ProductFeatureContext.Provider value={servicesFeatureProps}>
                <ProductServices />
            </ProductFeatureContext.Provider>
        </div>
    );
}

export default React.memo(CustomProduct);
