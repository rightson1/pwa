
import {
    createContext,
    useState,
    useMemo,
    useReducer,
    useContext,
    useEffect,
} from "react";
import { reducer, actionTypes } from "./reducer";
import { tokens, themeSettings } from "./theme";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider as Theme } from "@mui/material/styles";
import { CssBaseline, useMediaQuery } from "@mui/material";

const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
    const initialState = {
        theme: "dark",

    };
    const [state, dispatch] = useReducer(reducer, initialState);
    const mode = state.theme;
    const colors = tokens(mode);
    const [events, setEvents] = useState([])
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    const [open, setOpen] = useState(false);
    const [close, setClose] = useState(false);
    const isMobile = useMediaQuery("(max-width: 600px)")
    const isLarge = useMediaQuery("(min-width: 900px)");
    useEffect(() => {
        if (isMobile) {
            setOpen(false)
        } else {
            setOpen(true)

        }
        console.log(isLarge)
    }, [isLarge, isMobile])
    return (
        <ThemeContext.Provider
            value={{
                ...state,
                dispatch,
                actionTypes,
                colors,
                open,
                setOpen,
                mode,
                isMobile,
                events,
                setEvents,
                close,
                isLarge,
                setClose

            }}
        >
            <Theme theme={theme}>
                <CssBaseline />
                {children}</Theme>
        </ThemeContext.Provider>
    );
};
export const useGlobalProvider = () => useContext(ThemeContext);
