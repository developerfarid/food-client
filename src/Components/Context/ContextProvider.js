import React, { createContext } from 'react';
import AllData from '../Hooks/AllData';
export const AllContext = createContext()

const ContextProvider = ({ children }) => {
    const value = AllData()
    return (
        <AllContext.Provider value={value}>
            {children}
        </AllContext.Provider>
    );
};

export default ContextProvider;