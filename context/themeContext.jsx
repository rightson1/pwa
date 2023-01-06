
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
import { baseUrl } from "../src/data";
import { useRouter } from "next/router";
import axios from "axios";
import { setDoc, doc, getDocs, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
const ThemeContext = createContext();


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
    const isMobileSmall = useMediaQuery("(max-width: 600px)")
    const isLarge = useMediaQuery("(min-width: 900px)");
    const [change, setChange] = useState(false)
    const [positions, setPositions] = useState([])
    const [faqs, setFaqs] = useState([])

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
                faqs,
                setChange,
                setClose,
                positions,
                baseUrl,
                events,
                isMobileSmall


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
