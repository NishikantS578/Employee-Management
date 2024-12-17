import { createContext, ReactElement } from "react";

interface AppContextData {
    isLoggedIn: boolean
    userName: string
}

const appContext = createContext({} as AppContextData);

function AppContextProvider(props: { children: ReactElement }) {
    const value: AppContextData = { isLoggedIn: false, userName: "" };

    return <appContext.Provider value={value}>
        {props.children}
    </appContext.Provider>
}

export { appContext, AppContextProvider };