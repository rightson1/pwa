
import {
    createContext,
    useState,
    useMemo,
    useReducer,
    useContext,
    useEffect,
} from "react";
import { AuthProvider } from "./authContext";
import { reducer, actionTypes } from "./reducer";
import { tokens, themeSettings } from "./theme";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider as Theme } from "@mui/material/styles";
import { CssBaseline, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";

const ThemeContext = createContext();
export const baseUrl = "http://localhost:3000/api/";
export const ThemeProvider = ({ children }) => {
    const router = useRouter()
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

    }, [isLarge, isMobile])
    useEffect(() => {
        if (isMobile) {
            setOpen(false)
            return;
        } else if (isLarge) {
            setOpen(true)

        }

    }, [router.pathname])

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
                setClose,
                baseUrl

            }}
        >
            <AuthProvider>
                <Theme theme={theme}>
                    <CssBaseline />
                    {children}</Theme>
            </AuthProvider>
        </ThemeContext.Provider>
    );
};
export const useGlobalProvider = () => useContext(ThemeContext);
