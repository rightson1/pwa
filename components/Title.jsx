import React from "react";
import { Box, Typography } from "@mui/material"
import { useGlobalProvider } from "../context/themeContext"
import Header from "./Header";
const Title = ({ title, subtitle }) => {
    const { colors } = useGlobalProvider()
    return <Box>
        <Header title={title} desc={subtitle} />
        <Typography variant="h2" fontWeight="bold" color={colors.grey[100]}>{title}</Typography>
        <Typography variant="h4" fontWeight="bold" color={colors.greenAccent[500]} >{subtitle}</Typography>
    </Box>;
};

export default Title;
