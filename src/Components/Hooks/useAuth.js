import React, { useContext } from 'react';
import { AllContext } from '../Context/ContextProvider';

const useAuth = () => {
    return (
         useContext(AllContext)
    );
};

export default useAuth;