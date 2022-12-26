import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth"
import { useRouter } from "next/router";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState(null);
    const [user, setUser] = useState({});
    const [voter, setVoter] = useState(null);
    const router = useRouter()

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                });
                const q = query(collection(db, "admins"), where("email", "==", user.email));
                getDocs(q).then((res) => {
                    const [user, ...rest] = res.docs.map((doc) => {
                        return { id: doc.id, ...doc.data() }
                    })
                    if (user) {
                        setAdmin(user)
                    }
                })

            } else {
                setUser(null);
            }
        });
        setLoading(false);
        return () => {
            unsub()
        }
    }, [])

    const logout = async () => {
        setUser(null);
        await signOut(auth).then(() => {
            router.push('/')
        })
    }


    return (
        <AuthContext.Provider value={{ logout, admin, user, voter }}>
            {loading ? null : children}
        </AuthContext.Provider>
    );


}



export const useAuth = () => useContext(AuthContext)