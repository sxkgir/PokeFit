import { createContext, useContext, useState, ReactNode } from "react";
import { userApi } from "../api/userApi";
import { authApi } from "../Auth/authenticationApi";
import axios from "axios";
interface UserSignUp{
    userName: string;
    userPassword: string;
    userEmail: string;
}

interface UserLogIn {
    username: string;
    password: string;
}


interface BackendResponseData {
    error?: string; // the server might return an `error` property (optional)
    message?: string; // or maybe a `message` property on success
  }
  

  interface AddUserResponse {
    status: number;
    data: BackendResponseData;
}


  
  
interface userContextType{
    addUser: (user: UserSignUp) => Promise<void>;
    issuccess: boolean;
    resetSuccess: () => void;
    resetError: () => void;         
    stringTaken: string;
    resetStringTaken: () => void;
    connectDiscord: () => Promise<void>;
    isLoggedIn: boolean;
    checkAuth: () => Promise<void>;
    logInUser: (user: UserLogIn) => Promise<void>;
    isInvalidCredentials: boolean;
    userID: string;


  }

const UserContext = createContext<userContextType | undefined>(undefined);

export function UserProvider({children} : {children : ReactNode}){
    const [issuccess, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [stringTaken, setStringTaken] = useState("");
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isInvalidCredentials, setInvalidCredentials] = useState(false);
    const [userID, setUserID] = useState("");


    const resetSuccess = () => {
        setSuccess(false);
    }

    const resetStringTaken = () =>{
        setStringTaken("")
    }

    const resetError = () => {
        setErrorMessage(null);
      };
    

    const addUser = async (user : UserSignUp) => {
        try{
            setErrorMessage(null);

            const { status, data }: AddUserResponse = await userApi.addUser(user);
                if (status == 201){
                    setSuccess(true);
                    setInvalidCredentials(false);
                }
        }
        catch(error){
            if (axios.isAxiosError(error)) {
                console.error("Add user error status:", error.response?.status);
                const errorTaken = error.response?.data.error.originalError.info.message;
                    const match = errorTaken.match(/constraint '([^']+)'/);
                setStringTaken(match[1]);
            }
        }
    };

    const connectDiscord = async() => {
        window.location.href = "http://localhost:3000/api/auth/discord";
    }

    const checkAuth = async() => {
        try{
            const response = await authApi.checkAuth(); 
            if(response.loggedIn){
                if(response.user.provider === 'local'){
                    setUserID(response.user.username);
                }
                else if (response.user.provider === 'discord'){
                    setUserID(response.user.discord_id);
                }
                setLoggedIn(true);
            }
        }
        catch(error){
            console.log(error);
            setLoggedIn(false);
        }
    }

    const logInUser = async(user : UserLogIn) => {
        try{
            const response = await userApi.logInUser(user);
            setInvalidCredentials(false);
            setLoggedIn(true);
            console.log(response);
        }

        catch(error : any){
            if (error.response.data.InvalidCredential){
                setInvalidCredentials(true);
                setLoggedIn(false);
            }
            console.log(error);
        }
    }




    return(
        <UserContext.Provider value={{
            addUser,
            issuccess,
            resetSuccess,
            resetError,    
            stringTaken,
            resetStringTaken,
            connectDiscord,
            checkAuth,
            isLoggedIn,
            logInUser,
            isInvalidCredentials,
            userID,

        }}>
            {children}
        </UserContext.Provider>
    )

    
}

export function useUsers(){
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUsers must be used within a UserProvider");
    }
    return context; 
}