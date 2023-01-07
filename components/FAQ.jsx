import React, { useEffect, useState } from "react";
import axios from "axios"
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useGlobalProvider } from "../context/themeContext";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { useFaqDelete, useFaqQuery } from "../util/useFaq";

const FAQ = ({ voter }) => {
    const { colors, isMobile, faqs } = useGlobalProvider()
    const { data, isLoading, isError, error } = useFaqQuery()
    const [id, setId] = useState()

    const { mutate, isError: isDelete, isLoading: loading } = useFaqDelete()
    const { refetch } = useFaqQuery()
    const handleDelete = (id) => {
        setId(id)
        mutate(id)
        if (!isDelete) {
            refetch()
        }
    }
    return <Box>

        {data?.length ?
            data?.map(({ id: faqId, faq }, index) => (<Accordion
                sx={{
                    background: colors.primary[400]
                }}
                defaultExpanded key={index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        {faq?.quiz}
                    </Typography>

                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {faq?.ans}
                    </Typography>
                    {!voter && <Button
                        sx={{
                            color: `${colors.redAccent[700]} !important`,

                        }}
                        onClick={() => handleDelete(faqId)}
                    >{loading && id === faqId ? "loading..." : 'Delete'}</Button>}
                </AccordionDetails>
            </Accordion>)) : isLoading ? (
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
            ) :
                <Typography variant="h5" color={colors.greenAccent[500]}> No FAQ`&apos;s</Typography>
        }

    </Box>;
};

export default FAQ;
