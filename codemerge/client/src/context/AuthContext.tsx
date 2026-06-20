import {useState , createContext} from "react"
import { loginUser, registerUser } from "../services/authAPI";
import axios from "axios";

// import types
import type {RegisterData , LoginData , User} from "../types/auth.types"
import type {ReactNode} from "react";

interface AuthContextType {
    user : User | null,
    isAuthenticated : boolean,
    loading : boolean,
    login : (data : LoginData) => Promise<boolean>
    register : (data : RegisterData) => Promise<boolean>
}

interface AuthProviderProps {
    children : ReactNode
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children} : AuthProviderProps) => {
    
    const [user , setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [isAuthenticated , setIsAuthenticated] = useState(false);

    const login = async(data : LoginData) => {
        setLoading(true);
        try{
            const res = await loginUser(data);
            setUser(res.data.user);
            setIsAuthenticated(true);
            return true;
        }
        catch(err){
            if(axios.isAxiosError(err)){
                console.log(err.response?.data.message)
            } else {
                console.log("Something went wrong")
            }
            return false;
        }
        finally{
            setLoading(false);
        }
    }

    const register = async(data : RegisterData) => {
        setLoading(true);
        try{
            const res = await registerUser(data);
            setUser(res.data.user);
            setIsAuthenticated(true);
            return true;
        }
        catch(err){
            if(axios.isAxiosError(err)){
                console.log(err.response?.data.message)
            } else {
                console.log("Something went wrong")
            }
            return false;
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            isAuthenticated,
            login,
            register,
            
        }} >
            {children}
        </AuthContext.Provider>
    )
}
