import {createContext,useState,useEffect} from 'react';

//we created a context here with auth context
export const AuthContext = createContext()



export const AuthProvider = ({children}) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);
    const [loading, setLoading] = useState(true);

    

    return (
        <AuthContext.Provider value={{isUserLoggedIn, setIsUserLoggedIn, loading, setLoading}}>
            {children}
        </AuthContext.Provider>

    )
}