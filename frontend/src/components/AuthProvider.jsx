// // src/context/AuthContext.jsx
// import React, { createContext, useEffect, useState } from 'react';

// export const AuthContext = createContext({
//     user: null,
//     setUser: () => { },
//     logout: () => { }
// });

// export function AuthProvider({ children }) {
//     const [user, setUser] = useState(null);

//     // Hydrate from localStorage on mount
//     useEffect(() => {
//         const raw = localStorage.getItem('user');
//         if (raw) {
//             try { setUser(JSON.parse(raw)); }
//             catch { localStorage.removeItem('user'); }
//         }
//     }, []);

//     const logout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         setUser(null);
//     };

//     return (
//         <AuthContext.Provider value={{ user, setUser, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// }

import { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export const AuthContext = createContext({
    user: null,
    setUser: () => { },
    logout: () => { },
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const history = useHistory();

    // Hydrate from localStorage on mount
    useEffect(() => {
        const raw = localStorage.getItem('user');
        if (raw) {
            try {
                setUser(JSON.parse(raw));
            } catch {
                localStorage.removeItem('user');
            }
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        history.push('/signin');
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}