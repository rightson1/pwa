import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai"
import { motion } from "framer-motion"
import { GiCrossedBones } from "react-icons/gi"
import { Avatar } from "@mui/material";
import { Button } from "@mui/material";
const HomeNav = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false)

    return <>
        <div className="flex justify-between px-0 md:px-4 items-center text-black opacity-90 h-[80px]">
            <Button sx={{
                borderRadius: '50%',
                width: '40px',
                height: '60px',
                overflow: 'hidden',
                '& .MuiAvatar-img': {
                    opacity: .5,

                }
            }} onClick={() => router.push('/')}>
                <Avatar src="/mku.png" />
            </Button>
            <div className="hidden md:flex gap-4 text-[16px] opacity-75  ">
                <motion.button whileTap={{ background: 'black', color: 'black' }} className="cursor-pointer px-3 py-2 hover:border-b-[2px]" onClick={() => router.push('/')}>Home</motion.button>
                <motion.button whileTap={{ background: 'black', color: 'black' }} className="cursor-pointer px-3 py-2 hover:border-b-[2px]" onClick={() => router.push('/help')}>Help</motion.button>
            </div>
            <button onClick={() => router.push('/voter-registration')} className="hidden md:flex">Register</button>
            <motion.div className="close xm:cursor-pointer md:hidden mr-5 text-2xl cursor-pointer" onClick={() => setOpen(!open)} layout>
                {open ? <div className="flex flex-col gap-2">
                    <motion.div
                        initial={{
                            rotate: 0,
                        }}
                        animate={{
                            rotate: '-45deg',

                        }}

                        className="bg-black w-[30px] h-[2px] -ml-3"></motion.div>
                    <motion.div
                        initial={{
                            rotate: 0,
                        }}
                        animate={{
                            rotate: '45deg',
                        }}

                        className="bg-black w-[30px] h-[2px] -ml-3"></motion.div>
                    <motion.div
                        initial={{
                            scaleX: 1,
                        }}
                        animate={{
                            scaleX: 0,
                        }}

                        className="bg-black w-[30px] h-[2px] "></motion.div>
                </div> :
                    <div className="flex flex-col gap-2">
                        <motion.div
                            animate={{
                                rotate: 0,
                            }}
                            initial={{
                                rotate: '-45deg',

                            }}
                            className="bg-black w-[30px] h-[2px] -ml-3"></motion.div>
                        <div className="bg-black w-[30px] h-[2px]"></div>
                        <div className="bg-black w-[30px] h-[2px] -ml-3"></div>
                    </div>
                }
            </motion.div>

        </div>
        <div className={!open ? `fixed h-screen w-screen top-[100px] left-0 z-10 transition duration-[.3s] -translate-x-[100vw]` :
            "fixed h-screen w-screen  top-[100px] left-0 z-10 translate-x-0 transition duration-[.5s] "
        } onClick={() => setOpen(false)}>
            <div className="w-[250px]  h-[290px] bg-[rgba(255,255,255,1)] opacity-90  flex flex-col  justify-center  gap-4 mt-[100px] px-4" onClick={(e) => e.stopPropagation()}>

                <a className="cursor-pointer px-4 py-6 text-black text-[16px]  shadow-lg bg-[rgba(255,255,255,.1)] hover:bg-black hover:text-white" onClick={() => {
                    router.push('/')
                    return setOpen(false)
                }}>Home</a>
                <a className="cursor-pointer px-4 py-6 text-black text-[16px]  shadow-lg
                 bg-[rgba(255,255,255,.1)] hover:bg-black hover:text-white" onClick={() => {
                        router.push('/voter-registration')
                        return setOpen(false)
                    }}>Register</a>
                <a className="cursor-pointer px-4 py-6 text-black text-[16px]  shadow-lg
                 bg-[rgba(255,255,255,.1)] hover:bg-black hover:text-white" onClick={() => {
                        router.push('/help')
                        return setOpen(false)
                    }}>Help</a>



            </div>
        </div>
    </>

};

export default HomeNav;