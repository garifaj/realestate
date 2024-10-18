import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";

type UserData = {
    id: number;
    name: string;
    surname: string;
    phoneNumber: string;
    email: string;
    isAdmin: boolean;
}
type UserContextType = {
    user: UserData | null;
    setUser: (user: UserData | null) => void;
    ready: boolean;
}
type UserContextProviderProps = {
    children: ReactNode;
}


export const UserContext = createContext<UserContextType>({
    user:null,
    setUser: () => {},
    ready:false,
});

export function UserContextProvider ({children}: UserContextProviderProps ){
    const [user, setUser] = useState<UserData | null>(null);
    const [ready, setReady] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data } = await axios.get("http://localhost:5075/api/user", { withCredentials: true });
                setUser(data);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            } finally {
                setReady(true);
            }
        };

        if (!user) {
            fetchUserData();
        }
    }, [user]);

    return (
        <UserContext.Provider value={{user, setUser, ready}}>
            {children}
        </UserContext.Provider>
    )
}