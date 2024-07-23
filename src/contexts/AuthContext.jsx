/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../firebase/firebaseConfig';

const AuthContext = createContext(null);

const AuthProvider = function ({ children }) {
    const [userInfor, setUserInfor] = useState({});
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUserInfor(user)
        })
    }, [])

    return <AuthContext.Provider value={{ userInfor, setUserInfor }}>{children}</AuthContext.Provider>;
};

const useAuth = function() {
    const context = useContext(AuthContext);
    if(typeof context === 'undefined') {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export { AuthProvider, useAuth };
