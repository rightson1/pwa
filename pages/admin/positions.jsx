import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Header from "../../components/Title";
import { useGlobalProvider } from "../../context/themeContext";
import PositionCard from "../../components/PositionCard";
import { usePositionsQuery } from "../../util/usePositions";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
const Positions = () => {
    const { data, isLoading, } = usePositionsQuery();
    return <Box m={{
        xs: '20px 5px',
        sm: '20px 10px ',
        md: '20px'

    }}  >
        <Header title="ELECTROL POSITIONS" subtitle="List Of Electron Positions" />

        {
            data?.length > 0 ? (
                <Box
                    mt="20px"
                    display="grid"
                    gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
                    justifyContent="space-between"
                    rowGap="20px"
                    columnGap="1.33%"

                >
                    {

                        data.map((item) => {
                            return <PositionCard key={item.id} {...item} admin={true} />

                        }
                        )
                    }
                </Box>
            ) : isLoading ? (
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
                </Box>) :
                <Box
                    mt="20px"
                    display="grid"
                    gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
                    justifyContent="space-between"
                    rowGap="20px"
                    columnGap="1.33%"
                >
                    <Typography variant="h5" color="textSecondary" align="center">No Positions Found</Typography>
                </Box>


        }
    </Box>
};
Positions.getLayout = (page) => {
    return <>
        {page}
    </>
}
Positions.admin = true


export default Positions;
