import { EntityId } from "@reduxjs/toolkit";
import React, { FC, memo, useState } from "react";
import { selectProductName, setName, useBundleProductDispatch, useBundleProductSelector } from "./slices/bundle.slice";

interface BundleProductProps {
    id: EntityId;
}

const BundleProduct: FC<BundleProductProps> = ({ id }) => {

    const [newName, setNewName] = useState('');
    
    const name = useBundleProductSelector(id, selectProductName);
    const dispatch = useBundleProductDispatch(id);

    const handleSetName = () => dispatch(setName(newName));

    return (
        <div>
            <h3>{name}</h3>
            <input type="text" value={newName} onChange={e => setNewName(e.target.value)} />
            <button type="button" onClick={handleSetName}>Set</button>
        </div>
    )
}

export default memo(BundleProduct);
