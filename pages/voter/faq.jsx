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
FAQ.getLayout = (page) => {
    return <>
        {page}
    </>
}
FAQ.voter = true

export default FAQ;

