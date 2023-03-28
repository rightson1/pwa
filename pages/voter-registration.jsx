import { Grid, Box, Paper, Typography, Button, Divider, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import GoogleIcon from '@mui/icons-material/Google';
import { useRouter } from "next/router";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, getDocs, query, where, doc, setDoc } from "firebase/firestore";
import Info from "../components/Info";
import { Toaster, toast } from "react-hot-toast";
import { auth, db } from "../firebase"
import { FcGoogle } from "react-icons/fc";
import { useGlobalProvider } from "../context/themeContext";
import axios from "axios";
const Home = () => {
    const router = useRouter()
    const { colors, baseUrl } = useGlobalProvider();
    const [reg, setReg] = useState(null);

    const submit = async (e) => {
        if (!reg) {
            toast.error("Please enter a registration number")
            return
        }
        toast.loading("Creating Voter...")
        const sreg = String(reg.slice(0, 4))

        // if ((sreg === "DLAW") || (sreg === "BLAW") || (sreg === "blaw") || (sreg === "dlaw")) {
        const exists = await axios.get(`${baseUrl}/voters?reg=${reg}`).catch((e) => {
            toast.dismiss()
            toast.error("Something went wrong")
            console.log(e)
            return;
        })
        if (!exists) {
            toast.dismiss()
            toast.error("Something went wrong")
            return;
        }
        if (exists?.data > 0) {
            toast.dismiss()
            toast.error("Voter already exists")
            return
        }
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(({ user }) => {
                const { email, displayName: name, photoURL: photo } = user;
                axios.post(`${baseUrl}/voters`, { reg, email, name }).then((res) => {
                    const adminRef = doc(db, "voters", res.data._id);
                    setDoc(adminRef, {
                        reg,
                        email,
                        isDeleted: false,
                        name
                    }).then((e) => {
                        toast.dismiss()
                        toast.success("Voter Created Successfully")
                        router.push("/voter")


                    }).catch((e) => {
                        toast.dismiss()
                        toast.error("Something went wrong")
                        console.log(e)
                    })

                }).catch((e) => {
                    toast.dismiss()
                    console.log(e)
                    toast.error("Something went wrong")
                })
            }).catch((error) => {
                toast.dismiss()
                console.log(error)
                toast.error("Something went wrong")


            }).catch(() => {
                toast.dismiss()
                toast.error("Something went wrong")
            })

        // } else {
        //     toast.dismiss()
        //     toast.error("Please enter a valid registration number")
        // }

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
            >RIARA VOTING</Typography>
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
                minHeight: '40vh',

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
                >Register As Voter</Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: colors.primary[200],
                    }}

                >Already Have An Account ? <Typography component="button"
                    color={colors.teal[500]}
                    onClick={() => router.push('/')}
                >Login</Typography>
                </Typography>
                <Box
                    className="flex flex-col gap-2 items-center "
                >
                    <Typography
                        sx={{
                            alignSelf: 'flex-start',
                        }}
                    >Reg  Number</Typography>
                    <Box
                        component="input"
                        required
                        onChange={(e) => setReg(e.target.value)}

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


                <Button

                    className="flex gap-2 items-center"
                    onClick={() => submit()}
                    sx={{
                        bgcolor: 'transparent',
                        width: "100%",

                        border: `2px solid ${colors.black[300]}`,

                    }}
                >  <FcGoogle className="text-2xl" />


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
            </Box>


        </Grid>
    </Grid>;

};


Home.getLayout = (page) => {
    return <>
        {page}
    </>
}
Home.admin = false
export default Home;