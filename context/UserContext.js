import React, { createContext, useReducer, useEffect } from 'react';
import { userReducer } from "../reducers/UserReducer";

export const UserContext = createContext();

const initialState = {
    login: {
        username: 'Zulfahmi'
    }
}
const UserContextProvider = props => {

    const [state, dispatch] = useReducer(userReducer, initialState);
    
    // useEffect(() => {
        
    // }, []);

    return (
        <UserContext.Provider value={{login:state.login, dispatch}}>
            { props.children }
        </UserContext.Provider>
    )
}


export default UserContextProvider;