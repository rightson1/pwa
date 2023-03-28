import React, { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { auth, db } from "../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import HomeNav from "../components/HomeNav";
import { useGlobalProvider } from "../context/themeContext";
import { setDoc, doc } from "firebase/firestore";
import Info from "../components/Info";
import axios from "axios"

const Home = () => {
    const router = useRouter()
    const { baseUrl } = useGlobalProvider()
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false)
    const [visible, setVisible] = React.useState(false)
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [name, setName] = React.useState()
    const [message, setMessage] = React.useState("")

    const submit = (e) => {
        e.preventDefault()
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password).then(() => {
            axios.post(`${baseUrl}/admins`, { name, email, password }).then((res) => {
                const adminRef = doc(db, "admins", res.data._id);
                setDoc(adminRef, {
                    name,
                    email,
                    role: "admin",
                    isDeleted: false,
                    password
                }).then(() => {
                    setLoading(false)
                    router.push("/admin")
                    setMessage("Admin Created Successfully")
                    setOpen(true)

                }).catch(() => {
                    setLoading(false)
                })

            }).catch(() => {
                setLoading(false)
            })
        }).catch((error) => {
            setLoading(false)
            const errorCode = error.code;
            const errorMessage = error.message;

            setMessage(errorCode)
            setOpen(true)


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
                                <h1 className="text-xl font-bold"> Riara</h1>
                                <p className="text-[15px] font-thin">University</p>

                            </div>

                        </div>
                        <div className="flex flex-col mt-[10px]">
                            <h1 className="text-2xl font-bold">Register</h1>
                            <p>Hey There,Register To Continue</p>

                        </div>
                        <div className="w-[50px] h-[10px] bg-black"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2    w-full mt-7  gap-4  z-[5]" >

                            <div className="flex flex-col text-black items-start w-full">
                                <label htmlFor="">Name</label>
                                <input type="text" placeholder="Enter Name" className="py-4 placeholder:text-[10px] border-b border-black w-full  px-2   outline-none" required name="name" onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className="flex flex-col text-black items-start w-full">
                                <label htmlFor="">Email</label>
                                <input type="email" placeholder="Enter email" className="py-4 placeholder:text-[10px] border-b border-black w-full  px-2   outline-none" required name="email" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="flex flex-col text-black items-start full">
                                <label htmlFor="">Enter Password</label>
                                <input type={visible ? 'text' : "Password"} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" className="py-4 placeholder:text-[10px] border-b border-black w-full   px-2  outline-none" required name="password" />
                            </div>

                        </div>
                        <div className="flex flex-col     w-full mt-7  gap-4  z-[5] items-start justify-start" >


                            <div className="flex   text-black items-center gap-4 w-1/2 tl:w-full ">
                                <input type="checkbox" className="p-3 cursor-pointer" onChange={() => setVisible(!visible)} />
                                <label htmlFor="" className="text-[14px] font-thin">View Password</label>
                            </div>

                            <button className="bg-black py-3 px-4 text-white rounded-md max-w-[300px] flex justify-center items-center gap-2 w-3/4" onClick={submit}>{loading ? "Please Wait..." : "Register"} </button>

                        </div>
                        <p>Dont have an account? <button className="text-green cursor-pointer" onClick={() => router.push("/")}> Register As Voter</button></p>


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