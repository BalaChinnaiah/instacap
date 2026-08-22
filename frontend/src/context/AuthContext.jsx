import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import api from "../services/api";


const AuthContext = createContext();


export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);


    // --------------------------------
    // Check current logged-in user
    // --------------------------------

    async function getCurrentUser() {

        try {

            const response = await api.get(
                "/auth/me"
            );

            setUser(response.data.user);

        } catch (error) {

            setUser(null);

        } finally {

            setLoading(false);

        }
    }


    // --------------------------------
    // Run when application starts
    // --------------------------------

    useEffect(() => {

        getCurrentUser();

    }, []);


    // --------------------------------
    // Register
    // --------------------------------

    async function registerUser(
        username,
        email,
        password
    ) {

        const response = await api.post(
            "/auth/register",
            {
                username,
                email,
                password
            }
        );


        setUser(response.data.user);

        return response.data;

    }


    // --------------------------------
    // Login
    // --------------------------------

    async function loginUser(
        email,
        password
    ) {

        const response = await api.post(
            "/auth/login",
            {
                email,
                password
            }
        );


        setUser(response.data.user);

        return response.data;

    }


    // --------------------------------
    // Logout
    // --------------------------------

    async function logoutUser() {

        try {

            await api.post(
                "/auth/logout"
            );

        } finally {

            setUser(null);

        }
    }


    return (

        <AuthContext.Provider
            value={{
                user,
                loading,
                registerUser,
                loginUser,
                logoutUser,
                getCurrentUser
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}


export function useAuth() {

    return useContext(AuthContext);

}