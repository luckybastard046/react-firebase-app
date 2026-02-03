import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthReady, setIsAuthReady] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
            setIsAuthReady(true);
        })

        return unsubscribe
    }, [])

    const value = {
      isAuthReady,
      currentUser,
      setCurrentUser,
      loading,
    };

    return (
          <AuthContext.Provider value={value}>
            {!loading && children}
          </AuthContext.Provider>
      );
};

export const UseAuth = () => {
    return useContext(AuthContext);
};