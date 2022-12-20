import React, { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

// import { auth } from "../firebase"

// import { signInWithEmailAndPassword } from "firebase/auth";
// import { ToastContainer, toast } from "react-toastify";
// import { toastOptions } from "../components/data";
// import { baseUrl } from "../components/data";
// import axios from "axios";
import HomeNav from "../components/HomeNav";
import { useGlobalProvider } from "../context/themeContext";
const Home = () => {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [admin, setAdmin] = React.useState(true)
  const [visible, setVisible] = React.useState(false)
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  const variants = {
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: .2,
        delayChildren: .2
      },

    },

    initial: {
      opacity: 0

    }

  }


  const submit = (e) => {
    // if (!email || !password) {
    //   toast.error("Please fill all fields", toastOptions)
    //   return;
    // }
    // if (admin) {
    //   handleSubmit(e)
    // } else {
    //   handleSubmit1(e)
    // }

  }
  // const handleSubmit = async (e) => {

  //   setLoading(true)
  //   e.preventDefault()


  //   try {
  //     axios.get(`${baseUrl}/pedi?email=${email}`).then(async (res) => {

  //       if (res.data) {
  //         const userCredential = await signInWithEmailAndPassword(auth, email, password);
  //         router.push("/pedi")

  //       } else {
  //         toast.error("You are not an admin", toastOptions)
  //       }
  //       setLoading(false)
  //     }).catch((err) => {
  //       setLoading(false)
  //       toast.error("There was an error", toastOptions)
  //       console.log(err)
  //     })




  //   } catch (err) {

  //     toast.error(err.message, toastOptions)
  //     setLoading(false)
  //   }

  // }

  // const handleSubmit1 = async (e) => {

  //   setLoading(true)
  //   e.preventDefault()


  //   try {
  //     axios.get(`${baseUrl}/worker?email=${email}`).then(async (res) => {

  //       if (res.data) {
  //         const userCredential = await signInWithEmailAndPassword(auth, email, password);
  //         router.push("/worker")


  //       } else {
  //         toast.error("You are Not a worker ", toastOptions)
  //       }
  //       setLoading(false)
  //     }).catch((err) => {
  //       setLoading(false)

  //       toast.error("There was an error", toastOptions)
  //       console.log(err)
  //     })




  //   } catch (err) {

  //     toast.error(err.message, toastOptions)
  //     setLoading(false)
  //   }

  // }

  return <div className="w-screen h-screen overflow-hidden bg-[rgb(150,150,150)] -md md:p-8 ">
    <div className="w-full h-full bg-[rgb(200,200,200)] rounded p-4 overflow-y-auto overflow-x-hidden md:p-8">
      <HomeNav />
      <div className="flex  flex-col relative py-8 text-black">

        <div className="flex ">
          <div className="flex-1 flex px-7 flex-col gap-4">
            <div className="flex h-[80px]  gap-2">
              <div className="h-full w-[20px] bg-black"></div>
              <div className="flex flex-col text-black">
                <h1 className="text-xl font-bold"> THE </h1>
                <h1 className="text-xl font-bold"> MKU</h1>
                <p className="text-[15px] font-thin">Packlands law school</p>

              </div>

            </div>
            <div className="flex flex-col mt-[10px]">
              <h1 className="text-2xl font-bold">Login</h1>
              <p>Welcome back.Please Login to your account</p>

            </div>
            <div className="w-[50px] h-[10px] bg-black"></div>
            <div className="flex flex-col  w-full mt-7  gap-4  z-[5]" >

              <div className="flex flex-col text-black items-start w-3/4 tl:w-full">
                <label htmlFor="">Email</label>
                <input type="email" placeholder="Enter email" className="py-4 placeholder:text-[10px] border-b border-black w-full  px-2   outline-none" required name="email" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="flex flex-col text-black items-start w-3/4 tl:w-full ">
                <label htmlFor="">Enter Password</label>
                <input type={visible ? 'text' : "Password"} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" className="py-4 placeholder:text-[10px] border-b border-black w-full   px-2  outline-none" required name="password" />
              </div>
              <div className="flex   text-black items-center gap-4 w-3/4 tl:w-full ">
                <input type="checkbox" className="p-3 cursor-pointer" onChange={() => setVisible(!visible)} />
                <label htmlFor="" className="text-[14px] font-thin">View Password</label>
              </div>
              <div className="flex   text-black items-center gap-4 w-3/4 tl:w-full ">
                <motion.div
                  onClick={() => setAdmin(true)}
                  animate={
                    {
                      backgroundColor: admin ? "#000" : "#fff",

                      borderColor: !admin ? "#000" : "#000",
                      border: "1px solid #000",
                      color: !admin ? "black" : "white",
                    }
                  }

                  className="p-4 text-white  flex justify-center items-center  bg-black flex-1  border-b-[1px] cursor-pointer">Admin </motion.div>
                <motion.div
                  onClick={() => setAdmin(false)}
                  animate={
                    {
                      backgroundColor: admin ? "#fff" : "#000",
                      borderColor: admin ? "#000" : "#000",
                      color: admin ? "black" : "white",
                      border: "1px solid #000",
                    }
                  }
                  className="p-4 text-white  flex justify-center items-center  bg-black flex-1  border-b-[1px] cursor-pointer"> Worker </motion.div>
              </div>

              <button className="bg-black py-3 px-4 text-white rounded-md w-full flex justify-center items-center gap-2 w-3/4" onClick={submit}>{loading ? "Please Wait..." : "Login"} </button>
              <p>Dont have an account? <button className="text-green cursor-pointer" onClick={() => router.push("/worker/register")}>Register As Worker </button> or <button className="text-green cursor-pointer" onClick={() => router.push("/register")}> Register As Admin</button></p>

            </div>

          </div>
          <div className="absolute top-10 right-0 w-[80%] h-[400px] z-[1] opacity-10">
            <img src="/mku.png" alt="" className="h-full w-full object-cover " />
          </div>



        </div>

      </div>

    </div>
    {/* <ToastContainer /> */}

  </div>;
};

Home.getLayout = (page) => {
  return <>
    {page}
  </>
}
Home.admin = false
export default Home;