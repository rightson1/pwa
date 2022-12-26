import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/authContext"

const Protected = ({ children }) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {

        if (!user) {
            console.log('You are not logged in')
            router.push('/')
            return;
        }
    }, [user, router.push])

    return <>
        {user ? children : null}
    </>
};

export default Protected;