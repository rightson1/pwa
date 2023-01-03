import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Info from "../components/Info";
import HomeNav from "../components/HomeNav";
import { auth, db } from "../firebase"
import { collection, query, where, getDocs } from "firebase/firestore";
import { useGlobalProvider } from "../context/themeContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../context/authContext";
import { useTimeQuery } from "../util/useTime";

const Home = () => {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [voter, setVoter] = React.useState(true)
  const [visible, setVisible] = React.useState(false)
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [admn, setAdmin] = useState()
  const [message, setMessage] = React.useState("")
  const { admin, voter: student, user } = useAuth()
  const { data: time } = useTimeQuery()

  useEffect(() => {
    if (admin) {
      router.push("/admin")
    }
    if (student) {
      router.push("/voter")
    }
  }, [])
  const voterSubmit = () => {
    console.log('Be Patient')
  }
  const adminSubmit = async () => {
    if (!email || !password) {
      setMessage("Please fill in all fields")
      setOpen(true)
      return

    }
    setLoading(true)
    const q = query(collection(db, "admins"), where("email", "==", email));
    getDocs(q).then((res) => {
      const [user, ...rest] = res.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      })
      if (!user) {
        setMessage("Admin does not exist")
        setOpen(true)
        setLoading(false)
        return
      }
      signInWithEmailAndPassword(auth, email, password).then(() => {
        router.push("/admin")
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setMessage(errorCode)
        setOpen(true)
        setLoading(false)
      })
    }).catch(e => {
      setLoading(false)
      console.log(e)
    })


  }
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
                <p className="text-[15px] font-thin">Parklands</p>

              </div>

            </div>
            <div className="flex flex-col mt-[10px]">
              <h1 className="text-2xl font-bold">Login</h1>
              <p>Welcome back.Please Login to your account</p>

            </div>
            <div className="w-[50px] h-[10px] bg-black"></div>
            <div className="flex flex-col  w-full mt-7  gap-4  z-[5]" >

              {
                voter ? <div className="flex flex-col text-black items-start w-3/4 tl:w-full">
                  <label htmlFor="">Admission Number</label>
                  <input type="text" placeholder="Enter Admisssion Number" className="py-4 placeholder:text-[10px] border-b border-black w-full  px-2   outline-none" required name="email" onChange={(e) => setEmail(e.target.value)} />
                </div> :
                  <div className="flex flex-col text-black items-start w-3/4 tl:w-full">
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder="Enter email" className="py-4 placeholder:text-[10px] border-b border-black w-full  px-2   outline-none" required name="email" onChange={(e) => setEmail(e.target.value)} />
                  </div>
              }
              <div className="flex flex-col text-black items-start w-3/4 tl:w-full ">
                <label htmlFor="">Enter Password</label>
                <input type={visible ? 'text' : "Password"} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" className="py-4 placeholder:text-[10px] border-b border-black w-full   px-2  outline-none" required name="password" />
              </div>
              <div className="flex   text-black items-center gap-4 w-3/4 tl:w-full ">
                <input type="checkbox" className="p-3 cursor-pointer" onChange={() => setVisible(!visible)} />
                <label htmlFor="" className="text-[14px] font-thin">View Password</label>
              </div>
              <div className="flex   text-black items-center gap-4 w-3/4 tl:w-full  ">
                <motion.div
                  onClick={() => setVoter(true)}
                  animate={
                    {
                      backgroundColor: !voter ? "#fff" : "#000",
                      borderColor: !voter ? "#000" : "#000",
                      color: !voter ? "black" : "white",
                      border: "1px solid #000",
                    }
                  }
                  className="p-4 text-white  flex justify-center items-center  bg-black flex-1  border-b-[1px] cursor-pointer"> Voter </motion.div>
                <motion.div
                  onClick={() => setVoter(false)}
                  animate={
                    {
                      backgroundColor: !voter ? "#000" : "#fff",

                      borderColor: voter ? "#000" : "#000",
                      border: "1px solid #000",
                      color: voter ? "black" : "white",
                    }
                  }

                  className="p-4 text-white  flex justify-center items-center  bg-black flex-1  border-b-[1px] cursor-pointer">Admin </motion.div>

              </div>

              <button className="bg-black py-3 px-4 text-white rounded-md w-full flex justify-center items-center gap-2 w-3/4" onClick={voter ? voterSubmit : adminSubmit}>{loading ? "Please Wait..." : "Login"} </button>
              <p>Dont have an account? <button className="text-green cursor-pointer" onClick={() => router.push("/register")}>Register As Voter </button> or <button className="text-green cursor-pointer" onClick={() => router.push("/register")}> Register As Admin</button></p>

            </div>

          </div>
          <div className="absolute top-10 right-0 w-[80%] h-[400px] z-[1] opacity-10">
            <img src="/mku.png" alt="" className="h-full w-full object-cover " />
          </div>



        </div>

      </div>

    </div>
    <Info message={message} open={open} setOpen={setOpen} error={true} />


  </div>;
};

Home.getLayout = (page) => {
  return <>
    {page}
  </>
}
Home.admin = false
export default Home;