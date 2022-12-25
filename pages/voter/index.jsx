import React from "react";
import Box from "@mui/material/Box";

const Voter = () => {
    return <Box m="20px">Voter</Box>;
};

Voter.getLayout = (page) => {
    return <>
        {page}
    </>
}
Voter.voter = true
export default Voter;