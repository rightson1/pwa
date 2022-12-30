import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useGlobalProvider } from "../context/themeContext";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const FAQ = () => {
    const { colors, isMobile, faqs } = useGlobalProvider()
    console.log(faqs)
    return <Box>
        {faqs.length ?
            faqs.map((faq, index) => (<Accordion defaultExpanded key={index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        {faq.quiz}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {faq.ans}
                    </Typography>
                </AccordionDetails>
            </Accordion>)) : (
                <>
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
                            <Stack spacing={.5} key={index} mb="2rem">

                                <Skeleton variant="rectangular" width="100%" height={10} />
                                <Skeleton variant="rounded" width="100%" height={60} />
                            </Stack>
                        ))
                    }
                </>
            )
        }

    </Box>;
};

export default FAQ;
