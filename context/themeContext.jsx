
import {
    createContext,
    useState,
    useMemo,
    useReducer,
    useContext,
} from "react";
import { reducer, actionTypes } from "./reducer";
import { tokens, themeSettings } from "./theme";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider as Theme } from "@mui/material/styles";
const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
    const initialState = {
        theme: "dark",
    };
    const [state, dispatch] = useReducer(reducer, initialState);
    const mode = state.theme;
    const colors = tokens(mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return (
        <ThemeContext.Provider
            value={{
                dispatch,
                actionTypes,
                colors,
                mode,
            }}
        >

            <Theme theme={theme}>{children}</Theme>
        </ThemeContext.Provider>
    );
};
export const useGlobalProvider = () => useContext(ThemeContext);
