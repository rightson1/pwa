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
  const submit = () => {
    const provider = new GoogleAuthProvider();
    const sign = () => signInWithPopup(auth, provider)
      .then(({ user }) => {
        const { email, displayName, photoURL } = user;
        const q = query(collection(db, "voters"), where("email", "==", email));
        getDocs(q).then((res) => {
          const [user, ...rest] = res.docs.map((doc) => {
            return { id: doc.id, ...doc.data() }
          })
          if (!user) {
            toast.error("Voter does not exist")
            return;
          }
          else {
            router.push('/voter')
          }
        })
          .catch(e => {
            toast.error("Something went wrong")
            console.log(e)

          })
      })

    toast.promise(sign(), {
      loading: 'Signing In',
      success: 'Signed In',
      error: 'Error Signing In'
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
        >Welcome Back Dear,</Typography>
        <Typography
          variant="body2"
          sx={{
            color: colors.primary[200],
          }}

        > Dont Have An Account ? <Typography component="button"
          color={colors.teal[500]}
          onClick={() => router.push('/voter-registration')}
        >Register</Typography>
        </Typography>


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
        <Typography className="text-center">Or</Typography>
        <Divider sx={{
          width: "100%",
          my: 2,
        }} />
        <Button onClick={() => router.push('/adminLogin')} sx={{
          bgcolor: 'transparent',
          width: "100%",
          color: colors.black[300],
          border: `2px solid ${colors.black[300]}`,

        }}>Login As Admin</Button>
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