import React, { useEffect } from "react";
import Header from "../../components/Title";
import Calender from "../../components/Calender";
import {
    Box,

} from "@mui/material";

const Events = () => {


    return <Box
        m="1rem"
    >
        <Header title="EVENTS" subtitle="All Events" />

        <Calender />
    </Box>;
};
Events.getLayout = (page) => {
    return <>
        {page}
    </>
}
Events.admin = true
Events.head = ""


export default Events;
