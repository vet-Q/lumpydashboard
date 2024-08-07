// DataDisplay.js
import React from 'react';
import { dataPreparation } from '../../data/prepareData';

const DataDisplay = () => {
    const data = dataPreparation();

    return (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default DataDisplay;