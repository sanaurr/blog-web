'use client';
const { createContext, useState, useEffect } = require("react");
import jwt from 'jsonwebtoken';

const UserContext = createContext();
function UserProvider({children}) {
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [user, setUser] = useState(null);


    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedAccessToken = localStorage.getItem("accessToken");
            const storedRefreshToken = localStorage.getItem("refreshToken");
            setAccessToken(storedAccessToken);
            setRefreshToken(storedRefreshToken);
        }
    }, []);

    useEffect(() => {
        if (accessToken != null && refreshToken != null && accessToken != 'undefined' && refreshToken != 'undefined') {
            console.log(accessToken);
            const decoded = jwt.decode(accessToken);
            // console.log(decoded,'from useeffect userauth');
            if (decoded.exp * 1000 < Date.now()) {
                
                logout();
            }else {
                setUser(decoded);
            }
        } else {
            setUser(null);
        }
    }, [accessToken]);

    function login(token) {
        localStorage.setItem("accessToken", token.accessToken);
        localStorage.setItem("refreshToken", token.refreshToken);
        console.log(token);
        setAccessToken(token.accessToken);
        setRefreshToken(token.refreshToken);
    }

    function logout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setAccessToken(null);
        setRefreshToken(null);
    }

    return (
        <UserContext.Provider
            value={{
                name: user?.name,
                id: user?.id,
                isloggedin: user != null,
                accessToken,
                refreshToken,
                login,
                logout
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };