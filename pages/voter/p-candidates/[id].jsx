import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Header from "../../../components/Title";
import { useGlobalProvider } from "../../../context/themeContext";
import FAQ from "../../../components/FAQ";
import { usePositionQuery } from "../../../util/usePositions";
import { useRouter } from "next/router";
import Skeleton from '@mui/material/Skeleton';
import CandidateCard from "../../../components/CandidateCard";
import { usePositionCandidateQuery } from "../../../util/useCandidate"
const Faq = () => {
    const router = useRouter()
    const { id } = router.query

    const { data: position } = usePositionQuery(id);
    const { data: candidates } = usePositionCandidateQuery(id)


    return <Box m="20px">
        {position && <Header title={position.name} subtitle={position.name} />}

        <Box my={2}>
            {
                candidates?.length > 0 ? (
                    <Box
                        mt="20px"
                        display="grid"
                        gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
                        justifyContent="space-between"
                        rowGap="20px"
                        columnGap="1.33%"


                    >
                        {

                            candidates.map((item) => {
                                return <CandidateCard key={item.id} {...item} />

                            }
                            )
                        }
                    </Box>
                ) : (
                    <Box
                        Box
                        mt="20px"
                        display="grid"
                        gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
                        justifyContent="space-between"
                        rowGap="20px"
                        columnGap="1.33%">
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
                                <Box spacing={.5} key={index} height="100%" width="100%">

                                    <Skeleton variant="rectangular" width="100%" height="200px" />
                                </Box>
                            ))
                        }
                    </Box>
                )
            }
        </Box>
    </Box>;
};

Faq.getLayout = (page) => {
    return <>
        {page}
    </>
}
Faq.voter = true

export default Faq

