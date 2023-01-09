import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth"
import { useRouter } from "next/router";
import { auth, db } from "../firebase";
import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState(null);
    const [user, setUser] = useState({});
    const [voter, setVoter] = useState(null);

    const router = useRouter()
    const handleFetch = async (user, sAdmin, sVoter) => {
        if (sAdmin && sAdmin?.email === user.email) {
            setAdmin(sAdmin)

        } else if (sVoter && sVoter?.email === user.email) {
            setVoter(sVoter)
        }
        else {
            const q = query(collection(db, "admins"), where("email", "==", user.email));
            console.log('fetch')
            getDocs(q).then((res) => {
                const [admins, ...rest] = res.docs.map((doc) => {
                    return { id: doc.id, ...doc.data() }
                })
                if (admins) {

                    if (admins?.isDeleted) {
                        const deleteRef = doc(db, "admins", admins.id);
                        deleteUser(auth.currentUser).then(() => {
                            deleteDoc(deleteRef).then(() => {
                                signOut(auth).then(() => {
                                    router.push('/')
                                })
                            })
                        })
                    }
                    else {
                        setAdmin(admins)

                        localStorage.setItem('admin', JSON.stringify(admins))
                        return
                    }
                } else if (!admins) {
                    const q = query(collection(db, "voters"), where("email", "==", user.email));
                    console.log('fetch voter')
                    getDocs(q).then((res) => {
                        const [user, ...rest] = res.docs.map((doc) => {
                            return { id: doc.id, ...doc.data() }
                        })
                        if (user) {
                            if (user?.isDeleted) {
                                const deleteRef = doc(db, "voters", user.id);
                                deleteUser(auth.currentUser).then(() => {
                                    deleteDoc(deleteRef).then(() => {
                                        signOut(auth).then(() => {
                                            router.push('/')
                                        })
                                    })
                                })
                            } else {
                                setVoter(user)
                                localStorage.setItem('voter', JSON.stringify(user))
                                return
                            }

                        }
                    })
                }
            })
        }
    }
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            const sAdmin = localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin')) : null
            const sVoter = localStorage.getItem('voter') ? JSON.parse(localStorage.getItem('voter')) : null
            if (user) {
                setUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                });

                handleFetch(user, sAdmin, sVoter)
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
        localStorage.removeItem('admin')
        localStorage.removeItem('voter')
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