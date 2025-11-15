// src/hooks/useDataSaver.ts
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const DataSaverContext = createContext();

export function DataSaverProvider({ children }) {
    const [dataSaver, setDataSaver] = useState(false);

    useEffect(() => {
        // Auto-detect slow network
        if ('connection' in navigator) {
            const connection = navigator.connection;
            if (connection.saveData || connection.effectiveType === 'slow-2g') {
                setDataSaver(true);
            }
        }
    }, []);

    return (
        <DataSaverContext.Provider value={{ dataSaver, setDataSaver }}>
            {children}
        </DataSaverContext.Provider>
    );
}

export const useDataSaver = () => {
    const context = useContext(DataSaverContext);
    if (!context) {
        throw new Error('useDataSaver must be used within DataSaverProvider');
    }
    return context;
};