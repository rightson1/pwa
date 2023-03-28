import { Grid, Box, Paper, Typography, Button, Divider, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import GoogleIcon from '@mui/icons-material/Google';
import { useRouter } from "next/router";
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import Info from "../components/Info";
import { Toaster, toast } from "react-hot-toast";
import { auth, db } from "../firebase"
import { useGlobalProvider } from "../context/themeContext";
const AdminLogin = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const { colors } = useGlobalProvider();
    const [loading2, setLoading2] = useState(false);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        provider.addScope('email');
        provider.addScope('profile');

        const sign = () => signInWithPopup(auth, provider)
            .then(({ user }) => {
                const { email, displayName, photoURL } = user;
                const q = query(collection(db, "admins"), where("email", "==", email));
                getDocs(q).then((res) => {
                    const [user, ...rest] = res.docs.map((doc) => {
                        return { id: doc.id, ...doc.data() }
                    })
                    if (!user) {
                        toast.error("Admin not found")
                        return
                    }
                    router.push("/admin")
                })
            })

        toast.promise(sign(), {
            loading: 'Signing In',
            success: 'Signed In',
            error: 'Error Signing In'
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email || !password) {
            setMessage("Please fill in all fields")
            setOpen(true)
            return

        }

        setLoading(true)
        const q = query(collection(db, "admins"), where("email", "==", email.trim()));
        getDocs(q).then((res) => {
            const [user, ...rest] = res.docs.map((doc) => {
                return { id: doc.id, ...doc.data() }
            })
            if (!user) {
                toast.error("Admin not found")
                return
            }
            const sign = () => signInWithEmailAndPassword(auth, email.trim(), password.trim()).then(() => {
                router.push("/admin")
            })

            toast.promise(sign(), {
                loading: 'Signing In',
                success: 'Signed In',
                error: 'Error Signing In'
            })

        })
            .catch(e => {
                setLoading(false)
                console.log(e)
            })


    }
    const handleForgotPassword = () => {
        if (!email) return toast.error('Please enter your email')
        const forgot = () => sendPasswordResetEmail(auth, email)
        toast.promise(forgot(), {
            loading: 'Sending Email',
            success: 'Email Sent',
            error: 'Error Sending Email'
        })

    }


    return <Grid container
        sx={{
            zIndex: 5,
        }}
    >
        <Grid item
            xs={12}
            md={6}
            sx={{
                position: 'relative',
                backgroundImage: 'url(/reg.png)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'right bottom',
                width: "100%",
                p: 2,
                height: {
                    xs: "60vh",
                    md: "100vh"
                },
            }}
        >

            <Typography
                variant="h2" fontFamily="Atomic Age" color={colors.primary[500]}
            >H-Foods</Typography>
        </Grid>
        <Grid item
            xs={12}
            component={Paper}
            md={6}
            sx={{
                width: "100%",
                gap: 1,
                p: 2,
                bgcolor: colors.primary[600],
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',

            }}
        >

            <Box


                sx={{
                    display: 'flex',
                    gap: 2,
                    flexDirection: 'column',
                    width: {
                        xs: '80vw',
                        sm: '70vw',
                        md: '400px'
                    },
                }}>
                <Typography
                    variant="h3"
                    sx={{
                        alignSelf: 'flex-start',
                        opacity: 0.8,
                        fontWeight: 700,

                    }}
                >Login Voting</Typography>



                <Box>Use Google Sign In if possible</Box>
                <Box className="flex flex-col gap-5" component="form"
                    onSubmit={handleSubmit}
                >
                    <Box
                        className="flex flex-col gap-2 items-center "
                    >
                    </Box>

                    <Box
                        className="flex flex-col gap-2 items-center "
                    >
                        <Typography
                            sx={{
                                alignSelf: 'flex-start',
                            }}
                        >Email</Typography>
                        <Box
                            component="input"
                            required
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}

                            sx={{
                                width: "100%",
                                outline: colors.teal[100],
                                bgcolor: 'transparent',
                                border: `1px solid ${colors.black[400]}`,
                                '$:focus': {
                                    outline: colors.teal[100],
                                }
                            }}
                            className="resize-none rounded-md p-4 focus:border-teal-500 focus:border-2  w-full"

                        />
                    </Box>

                    <Box
                        className="flex flex-col gap-2 items-center "
                    >
                        <Typography
                            sx={{
                                alignSelf: 'flex-start',
                            }}
                        >Password</Typography>
                        <Box
                            component="input"
                            required
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}

                            sx={{
                                width: "100%",
                                outline: colors.teal[100],
                                bgcolor: 'transparent',
                                border: `1px solid ${colors.black[400]}`,
                                '$:focus': {
                                    outline: colors.teal[100],
                                }
                            }}
                            className="resize-none rounded-md p-4 focus:border-teal-500 focus:border-2  w-full"

                        />
                    </Box>
                    <Typography
                        className="flex gap-2 items-center"
                        component="button"
                        type="button"
                        onClick={() => handleForgotPassword()}
                    >
                        Forgot Password?
                    </Typography>
                    {
                        loading2 ? <Button><CircularProgress /> </Button> :
                            <Button
                                className="flex gap-2 items-center"
                                type="submit"
                                sx={{
                                    bgcolor: colors.orange[500] + ' !important',
                                    width: "100%",
                                }}
                            >
                                Login
                            </Button>
                    }
                </Box>
                <div className="flex justify-center">Or</div>
                <Divider />

                <Divider />

                <Button
                    className="flex gap-2 items-center"
                    onClick={() => signInWithGoogle()}
                    sx={{
                        bgcolor: 'transparent',
                        width: "100%",
                        border: `2px solid ${colors.black[300]}`,

                    }}
                >   <GoogleIcon sx={{
                    color: colors.orange[500],

                }}
                    />


                    <Typography
                        sx={{
                            color: colors.black[300],
                            fontWeight: 700,
                        }}
                    >
                        Google
                    </Typography>
                </Button>

                <Toaster />
                {message && <Info {...{ message, setMessage }} />}
            </Box>


        </Grid>
    </Grid>;
};
AdminLogin.getLayout = (page) => {
    return <>
        {page}
    </>
}
AdminLogin.admin = false
export default AdminLogin;