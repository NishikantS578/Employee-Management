import { createContext, ReactElement } from "react";

interface AppContextData {
    isLoggedIn: boolean
    userName: string
    serverUrl: string
}

const appContext = createContext({} as AppContextData);

function AppContextProvider(props: { children: ReactElement }) {
    const isLoggedIn = localStorage.getItem("l") == "T";

    const value: AppContextData = { isLoggedIn: isLoggedIn, userName: "", serverUrl: "http://localhost:3001/api" };

    return <appContext.Provider value={value}>
        {props.children}
    </appContext.Provider>
}

export { appContext, AppContextProvider };