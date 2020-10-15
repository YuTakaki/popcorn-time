import React, {createContext} from 'react';

export const API_CODE = createContext();
const ApiCode = (props) => {
    const code= '2effcb37ac7b1550616d653eea9cb4d6';
    return ( 
        <API_CODE.Provider value={{code}}>
            {props.children}
        </API_CODE.Provider>
     );
}
 
export default ApiCode;