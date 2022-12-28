import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Header from "../../components/Title";
import { useGlobalProvider } from "../../context/themeContext";
import FAQ from "../../components/FAQ";
const Faq = () => {
    const { colors, isMobile } = useGlobalProvider()
    return <Box m="20px">
        <Header title="FAQ" subtitle="Frequently Asked Questions Page" />
        <FAQ />
    </Box>;
};

Faq.getLayout = (page) => {
    return <>
        {page}
    </>
}
Faq.admin = true

export default Faq;
