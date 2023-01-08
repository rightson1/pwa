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
import emailjs from '@emailjs/browser';
const Home = () => {
    const router = useRouter()
    const [loading, setLoading] = React.useState(false)
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("")


    const { admin, voter: student, user } = useAuth()



    useEffect(() => {
        if (admin) {
            router.push("/admin")
        }
        if (student) {
            router.push("/voter")
        }
    }, [])


    const submit = (e) => {
        console.log(e.target);
        e.preventDefault();
        setLoading(true);
        emailjs
            .sendForm(
                "service_0ady6pa",
                "template_ver6v3e",
                e.target,
                "5kOjUoERLzqz_vj0O"
            )
            .then((res) => {
                setMessage("Message sent successfully, i will get back to you shortly")
                setOpen(true)
                e.target.reset();
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setLoading(false);
                setMessage("Message not sent, please try again")
                setOpen(true)

            });
        e.target.reset();
    };
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
                            <h1 className="text-2xl font-bold">Hello There</h1>
                            <p>Having any problems?</p>

                        </div>
                        <div className="w-[50px] h-[10px] bg-black"></div>

                        <p>
                            We are here to help you. Please fill in the form below or email chari.rightson@gmail.com and we will get back to you as soon as possible.
                        </p>
                        <form onSubmit={submit} className="grid grid-cols-1   w-full mt-2  gap-4  z-[5] md:pr-[150px]" >

                            <div className="flex flex-col text-black items-start w-full">
                                <label htmlFor="">Name</label>
                                <input type="text" placeholder="Enter Name" className="py-4 placeholder:text-[10px] w-full  px-2   outline-none rounded-md" required name="name" />
                            </div>

                            <div className="flex flex-col text-black items-start w-full">
                                <label htmlFor="">Email</label>
                                <input type="email" placeholder="Enter email" className="py-4 placeholder:text-[10px] w-full  px-2   outline-none rounded-md" required name="email" />
                            </div>
                            <div className="flex flex-col text-black items-start full">
                                <label htmlFor="">Enter The Problem You Experienced</label>
                                <textarea type='text' placeholder="type your problem" className="py-4 resize-none placeholder:text-[10px] w-full   px-2  outline-none rounded-md" required name="message" />
                            </div>
                            <div className="w-full flex justify-end ">
                                <button className="bg-black py-3 px-4 text-white rounded-md  self-end justify-end" type="submit">{loading ? "Please Wait..." : "Submit"} </button>

                            </div>

                        </form>

                    </div>
                    <div className="absolute top-10 right-0 w-[80%] h-[400px] z-[1] opacity-10">
                        <img src="/mku.png" alt="" className="h-full w-full object-cover " />
                    </div>



                </div>

            </div>

        </div>
        <Info message={message} open={open} setOpen={setOpen} />


    </div>;
};

Home.getLayout = (page) => {
    return <>
        {page}
    </>
}
Home.admin = false
export default Home;