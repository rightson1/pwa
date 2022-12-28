import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Header from "../../components/Title";
import { positions } from "../../src/data";
import PositionCard from "../../components/PositionCard";
const Positions = () => {
    return <Box m={{
        xs: '20px 5px',
        sm: '20px 10px ',
        md: '20px'

    }}  >
        <Header title="ELECTROL POSITIONS" subtitle="List Of Electron Positions" />

        {
            positions || !isLoading ? (
                <Box
                    mt="20px"
                    display="grid"
                    gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
                    justifyContent="space-between"
                    rowGap="20px"
                    columnGap="1.33%"

                >
                    {

                        positions.map((item) => {
                            return <PositionCard key={item.id} {...item} />

                        }
                        )
                    }
                </Box>
            ) : (<>
                Loading....
            </>)
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
