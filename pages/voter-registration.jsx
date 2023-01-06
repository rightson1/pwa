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
    const [reg, setReg] = React.useState()
    const [message, setMessage] = React.useState("")

    const submit = async (e) => {
        e.preventDefault()
        const email = e.target.email.value.trim()
        const password = e.target.password.value.trim()
        const reg = e.target.reg.value.trim()
        const sreg = String(reg.slice(0, 4))
        setLoading(true)

        if ((sreg === "DLAW") || (sreg === "BLAW") || (sreg === "blaw") || (sreg === "dlaw")) {
            const exists = await axios.get(`${baseUrl}/voters?reg=${reg}`)
            if (exists.data > 0) {
                setLoading(false)
                setMessage("Voter already exists")
                setOpen(true)
                return
            }
            createUserWithEmailAndPassword(auth, email, password).then(() => {
                axios.post(`${baseUrl}/voters`, { reg, email, password }).then((res) => {
                    const adminRef = doc(db, "voters", res.data._id);
                    setDoc(adminRef, {
                        reg,
                        email,
                        isDeleted: false,
                        password
                    }).then(() => {
                        setLoading(false)
                        router.push("/voter")
                        setMessage("Voter Created Successfully")

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

        } else {
            setLoading(false)
            setMessage("Kindly enter a valid registration number")
            setOpen(true)
        }



    }

    return <div className="w-screen h-screen overflow-hidden bg-[rgb(150,150,150)] -md md:p-8 ">
        <div className="w-full h-full bg-[rgb(200,200,200)] rounded p-4 overflow-y-auto overflow-x-hidden md:p-8">
            <HomeNav />
            <div className="flex  flex-col relative py-8 text-black">

                <form className="flex " onSubmit={submit}>
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
                            <h1 className="text-2xl font-bold">Register</h1>
                            <p>Hey There,Register To Continue</p>

                        </div>
                        <div className="w-[50px] h-[10px] bg-black"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2    w-full mt-7  gap-4  z-[5]" >

                            <div className="flex flex-col text-black items-start w-full">
                                <label htmlFor="">Registration Number</label>
                                <input type="text" placeholder="Enter Reg" className="py-4 placeholder:text-[10px] border-b border-black w-full  px-2   outline-none" required name="reg" />
                            </div>

                            <div className="flex flex-col text-black items-start w-full">
                                <label htmlFor="">Email</label>
                                <input type="email" placeholder="Enter email" className="py-4 placeholder:text-[10px] border-b border-black w-full  px-2   outline-none" required name="email" />
                            </div>
                            <div className="flex flex-col text-black items-start full">
                                <label htmlFor="">Enter Password</label>
                                <input type={visible ? 'text' : "Password"} placeholder="Enter Password(no-spaces)" className="py-4 placeholder:text-[10px] border-b border-black w-full   px-2  outline-none" required name="password" />
                            </div>

                        </div>
                        <div className="flex flex-col     w-full mt-7  gap-4  z-[5] items-start justify-start" >


                            <div className="flex   text-black items-center gap-4 w-1/2 tl:w-full ">
                                <input type="checkbox" className="p-3 cursor-pointer" onChange={() => setVisible(!visible)} />
                                <label htmlFor="" className="text-[14px] font-thin">View Password</label>
                            </div>

                            <button className="bg-black py-3 px-4 text-white rounded-md max-w-[300px] flex justify-center items-center gap-2 w-3/4" type="submit">{loading ? "Please Wait..." : "Register"} </button>

                        </div>
                        <p>Already have an Account? <button className="text-green cursor-pointer" type="button" onClick={() => router.push("/")}>Login</button></p>


                    </div>
                    <div className="absolute top-10 right-0 w-[80%] h-[400px] z-[1] opacity-10">
                        <img src="/mku.png" alt="" className="h-full w-full object-cover " />
                    </div>



                </form>

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