
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
import axios from "axios";
const ThemeContext = createContext();
// export const baseUrl = "http://localhost:3000/api/";
export const baseUrl = "https://pwa-lake-kappa.vercel.app/api/events";
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
    const [change, setChange] = useState(false)

    useEffect(() => {
        if (isMobile) {
            setOpen(false)
        } else {
            setOpen(true)

        }

    }, [isLarge, isMobile])
    useEffect(() => {
        if (!isLarge) {
            setOpen(false)
            return;
        } else if (isLarge) {
            setOpen(true)

        }

    }, [router.pathname])
    useEffect(() => {
        axios.get(`${baseUrl}/events`).then((res) => {
            setEvents(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [change])

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
                change,
                events,
                setEvents,
                close,
                isLarge,
                setChange,
                setClose,
                baseUrl

            }}
        >

            <Theme theme={theme}>
                <AuthProvider>
                    <CssBaseline />
                    {children}
                </AuthProvider>
            </Theme>

        </ThemeContext.Provider>
    );
};
export const useGlobalProvider = () => useContext(ThemeContext);
